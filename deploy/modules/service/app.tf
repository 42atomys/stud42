resource "kubernetes_manifest" "certificate" {
  for_each = { for k, v in var.certificates : k => v }

  manifest = {
    apiVersion = "cert-manager.io/v1"
    kind       = "Certificate"
    metadata = {
      name      = each.key == "default" ? var.name : "${var.name}-${each.key}"
      namespace = var.namespace
      labels    = local.defaultLabels
    }
    spec = {
      secretName = each.key == "default" ? "${var.name}-tls" : "${var.name}-${each.key}-tls"
      issuerRef = {
        name = each.value.issuerRefName
        kind = each.value.issuerRefKind
      }
      dnsNames = each.value.dnsNames
    }
  }
}

resource "kubernetes_secret" "app" {
  for_each = { for k, v in var.secrets : k => v }

  metadata {
    name      = "${var.name}-${each.key}"
    namespace = var.namespace
    labels    = local.defaultLabels
  }

  immutable = lookup(each.value, "immutable", false)
  type      = each.value.type
  data      = each.value.data
}

resource "kubernetes_config_map" "app" {
  for_each = { for k, v in var.configMaps : k => v }

  metadata {
    name      = "${var.name}-${each.key}"
    namespace = var.namespace
    labels    = local.defaultLabels
  }

  immutable = lookup(each.value, "immutable", false)
  data      = each.value.data
}

resource "kubernetes_persistent_volume_claim" "app" {
  for_each = { for k, v in var.persistentVolumeClaims : k => v if var.enabled }

  metadata {
    name      = "${var.name}-${each.key}"
    namespace = var.namespace
    labels    = local.defaultLabels
  }

  spec {
    storage_class_name = each.value.storageClassName
    access_modes       = each.value.accessModes
    volume_name        = each.value.volumeName
    resources {
      requests = {
        storage = each.value.storage
      }
    }
  }
}

resource "kubernetes_deployment" "app" {
  count = var.enabled && var.kind == "Deployment" ? 1 : 0
  metadata {
    name        = var.name
    namespace   = var.namespace
    labels      = merge(local.defaultLabels, var.deploymentLabels)
    annotations = var.deploymentAnnotations
  }

  spec {
    replicas               = var.replicas
    revision_history_limit = var.revisionHistoryLimit
    selector {
      match_labels = {
        "kubernetes.io/name" = var.name
      }
    }

    strategy {
      type = "RollingUpdate"
      rolling_update {
        max_surge       = var.maxSurge
        max_unavailable = var.maxUnavailable
      }
    }

    template {
      metadata {
        labels = merge({
          "app"                          = var.appName
          "version"                      = var.appVersion
          "kubernetes.io/name"           = var.name
          "app.kubernetes.io/managed-by" = "terraform"
          "app.kubernetes.io/created-by" = "github-actions"
        }, var.podLabels)

        annotations = merge({
          "prometheus.io/scrape" = var.prometheus.enabled ? "true" : "false"
          "prometheus.io/path"   = var.prometheus.path
          "prometheus.io/port"   = var.prometheus.port
        }, var.podAnnotations)
      }
      spec {
        image_pull_secrets {
          name = "ghcr-creds"
        }
        dynamic "image_pull_secrets" {
          for_each = toset(var.imagePullSecrets)
          content {
            name = each.key
          }
        }
        node_selector = var.nodeSelector

        security_context {
          run_as_user         = lookup(var.podSecurityContext, "runAsUser", 1000)
          run_as_group        = lookup(var.podSecurityContext, "runAsGroup", 1000)
          fs_group            = lookup(var.podSecurityContext, "fsGroup", 1000)
          run_as_non_root     = lookup(var.podSecurityContext, "runAsNonRoot", true)
          supplemental_groups = lookup(var.podSecurityContext, "supplementalGroups", [1000])
        }

        container {
          name              = var.name
          image             = var.image
          image_pull_policy = var.imagePullPolicy
          command           = var.command
          args              = var.args != null ? var.args : []

          dynamic "env" {
            for_each = { for k, v in var.envFromSecret : k => v }
            content {
              name = env.key
              value_from {
                secret_key_ref {
                  name = env.value.name
                  key  = env.value.key
                }
              }
            }
          }

          dynamic "env" {
            for_each = { for k, v in var.envFromConfigMap : k => v }
            content {
              name = env.key
              value_from {
                config_map_key_ref {
                  name = env.value.name
                  key  = env.value.key
                }
              }
            }
          }

          dynamic "env" {
            for_each = { for k, v in var.envFromFieldRef : k => v }
            content {
              name = env.key
              value_from {
                field_ref {
                  field_path = env.value.field_path
                }
              }
            }
          }

          dynamic "env" {
            for_each = { for k, v in var.env : k => v }
            content {
              name  = env.key
              value = env.value
            }
          }

          dynamic "port" {
            for_each = { for k, v in var.ports : k => v }
            content {
              name           = "${port.value.istioProtocol}-${port.key}"
              container_port = port.value.containerPort
              protocol       = lookup(port.value, "protocol", "TCP")
            }
          }

          resources {
            requests = var.resources.requests != null ? {
              cpu    = lookup(var.resources.requests, "cpu", "100m")
              memory = lookup(var.resources.requests, "memory", "128Mi")
            } : {}
            limits = var.resources.limits != null ? {
              cpu    = lookup(var.resources.limits, "cpu", null)
              memory = lookup(var.resources.limits, "memory", "128Mi")
            } : {}
          }

          dynamic "volume_mount" {
            for_each = var.volumeMounts
            content {
              name              = volume_mount.value.volumeName
              mount_path        = volume_mount.value.mountPath
              read_only         = lookup(volume_mount.value, "readOnly", false)
              sub_path          = lookup(volume_mount.value, "subPath", null)
              mount_propagation = lookup(volume_mount.value, "mountPropagation", null)
            }
          }

          dynamic "liveness_probe" {
            for_each = var.livenessProbe != null ? [1] : []
            content {
              http_get {
                path   = var.livenessProbe.httpGet.path
                port   = var.livenessProbe.httpGet.port
                scheme = var.livenessProbe.httpGet.scheme
              }
              initial_delay_seconds = var.livenessProbe.initialDelaySeconds
              period_seconds        = var.livenessProbe.periodSeconds
              timeout_seconds       = var.livenessProbe.timeoutSeconds
              success_threshold     = var.livenessProbe.successThreshold
              failure_threshold     = var.livenessProbe.failureThreshold
            }
          }

          dynamic "readiness_probe" {
            for_each = var.readinessProbe != null ? [1] : []
            content {
              http_get {
                path = var.readinessProbe.httpGet.path
                port = var.readinessProbe.httpGet.port
              }
              initial_delay_seconds = var.readinessProbe.initialDelaySeconds
              period_seconds        = var.readinessProbe.periodSeconds
              timeout_seconds       = var.readinessProbe.timeoutSeconds
              success_threshold     = var.readinessProbe.successThreshold
              failure_threshold     = var.readinessProbe.failureThreshold
            }
          }

          dynamic "startup_probe" {
            for_each = var.startupProbe != null ? [1] : []
            content {
              http_get {
                path = var.startupProbe.httpGet.path
                port = var.startupProbe.httpGet.port
              }
              initial_delay_seconds = var.startupProbe.initialDelaySeconds
              period_seconds        = var.startupProbe.periodSeconds
              timeout_seconds       = var.startupProbe.timeoutSeconds
              success_threshold     = var.startupProbe.successThreshold
              failure_threshold     = var.startupProbe.failureThreshold
            }
          }

          security_context {
            run_as_user     = lookup(var.containerSecurityContext, "runAsUser", 1000)
            run_as_group    = lookup(var.containerSecurityContext, "runAsGroup", 1000)
            run_as_non_root = lookup(var.containerSecurityContext, "runAsNonRoot", true)

            dynamic "capabilities" {
              for_each = { for k, v in var.containerSecurityContext.capabilities : k => v }
              content {
                add  = capabilities.value.add
                drop = capabilities.value.drop
              }
            }

            allow_privilege_escalation = lookup(var.containerSecurityContext, "allowPrivilegeEscalation", false)
            privileged                 = lookup(var.containerSecurityContext, "privileged", false)
          }

          working_dir = var.workingDir
        }

        dynamic "volume" {
          for_each = { for k, v in var.volumesFromConfig : k => v }
          content {
            name = volume.key
            config_map {
              name = volume.value.configMapName
            }
          }
        }

        dynamic "volume" {
          for_each = { for k, v in var.volumesFromSecret : k => v }
          content {
            name = volume.key
            secret {
              secret_name = volume.value.secretName
            }
          }
        }

        dynamic "volume" {
          for_each = { for k, v in var.volumesFromEmptyDir : k => v }
          content {
            name = volume.key
            empty_dir {}
          }
        }

        dynamic "volume" {
          for_each = { for k, v in var.volumesFromPVC : k => v }

          content {
            name = volume.key
            persistent_volume_claim {
              claim_name = volume.value.claimName
              read_only  = lookup(volume.value, "readOnly", false)
            }
          }
        }
      }
    }
  }

  wait_for_rollout = var.waitForRollout
}

resource "kubernetes_stateful_set" "app" {
  count = var.enabled && var.kind == "StatefulSet" ? 1 : 0

  depends_on = [
    kubernetes_service.app
  ]
  metadata {
    name        = var.name
    namespace   = var.namespace
    labels      = merge(local.defaultLabels, var.deploymentLabels)
    annotations = var.deploymentAnnotations
  }

  spec {
    pod_management_policy  = var.podManagementPolicy
    replicas               = var.replicas
    revision_history_limit = var.revisionHistoryLimit
    service_name           = var.name
    selector {
      match_labels = {
        "kubernetes.io/name" = var.name
      }
    }

    update_strategy {
      type = var.updateStrategy
      rolling_update {
        partition = var.updatePartition
      }
    }

    template {
      metadata {
        labels = merge({
          "app"                          = var.appName
          "version"                      = var.appVersion
          "kubernetes.io/name"           = var.name
          "app.kubernetes.io/managed-by" = "terraform"
          "app.kubernetes.io/created-by" = "github-actions"
        }, var.podLabels)

        annotations = merge({
          "prometheus.io/scrape" = var.prometheus.enabled ? "true" : "false"
          "prometheus.io/path"   = var.prometheus.path
          "prometheus.io/port"   = var.prometheus.port
        }, var.podAnnotations)
      }
      spec {
        image_pull_secrets {
          name = "ghcr-creds"
        }
        dynamic "image_pull_secrets" {
          for_each = toset(var.imagePullSecrets)
          content {
            name = each.key
          }
        }
        node_selector = var.nodeSelector

        security_context {
          run_as_user         = lookup(var.podSecurityContext, "runAsUser", 1000)
          run_as_group        = lookup(var.podSecurityContext, "runAsGroup", 1000)
          fs_group            = lookup(var.podSecurityContext, "fsGroup", 1000)
          run_as_non_root     = lookup(var.podSecurityContext, "runAsNonRoot", true)
          supplemental_groups = lookup(var.podSecurityContext, "supplementalGroups", [1000])
        }

        container {
          name              = var.name
          image             = var.image
          image_pull_policy = var.imagePullPolicy
          command           = var.command
          args              = var.args != null ? var.args : []

          dynamic "env" {
            for_each = { for k, v in var.envFromSecret : k => v }
            content {
              name = env.key
              value_from {
                secret_key_ref {
                  name = env.value.name
                  key  = env.value.key
                }
              }
            }
          }

          dynamic "env" {
            for_each = { for k, v in var.envFromConfigMap : k => v }
            content {
              name = env.key
              value_from {
                config_map_key_ref {
                  name = env.value.name
                  key  = env.value.key
                }
              }
            }
          }

          dynamic "env" {
            for_each = { for k, v in var.envFromFieldRef : k => v }
            content {
              name = env.key
              value_from {
                field_ref {
                  field_path = env.value.field_path
                }
              }
            }
          }

          dynamic "env" {
            for_each = { for k, v in var.env : k => v }
            content {
              name  = env.key
              value = env.value
            }
          }

          dynamic "port" {
            for_each = { for k, v in var.ports : k => v }
            content {
              name           = "${port.value.istioProtocol}-${port.key}"
              container_port = port.value.containerPort
              protocol       = lookup(port.value, "protocol", "TCP")
            }
          }

          resources {
            requests = var.resources.requests != null ? {
              cpu    = lookup(var.resources.requests, "cpu", "100m")
              memory = lookup(var.resources.requests, "memory", "128Mi")
            } : {}
            limits = var.resources.limits != null ? {
              cpu    = lookup(var.resources.limits, "cpu", null)
              memory = lookup(var.resources.limits, "memory", "128Mi")
            } : {}
          }

          dynamic "volume_mount" {
            for_each = var.volumeMounts
            content {
              name              = volume_mount.value.volumeName
              mount_path        = volume_mount.value.mountPath
              read_only         = lookup(volume_mount.value, "readOnly", false)
              sub_path          = lookup(volume_mount.value, "subPath", null)
              mount_propagation = lookup(volume_mount.value, "mountPropagation", null)
            }
          }

          dynamic "liveness_probe" {
            for_each = var.livenessProbe != null ? [1] : []
            content {
              http_get {
                path   = var.livenessProbe.httpGet.path
                port   = var.livenessProbe.httpGet.port
                scheme = var.livenessProbe.httpGet.scheme
              }
              initial_delay_seconds = var.livenessProbe.initialDelaySeconds
              period_seconds        = var.livenessProbe.periodSeconds
              timeout_seconds       = var.livenessProbe.timeoutSeconds
              success_threshold     = var.livenessProbe.successThreshold
              failure_threshold     = var.livenessProbe.failureThreshold
            }
          }

          dynamic "readiness_probe" {
            for_each = var.readinessProbe != null ? [1] : []
            content {
              http_get {
                path = var.readinessProbe.httpGet.path
                port = var.readinessProbe.httpGet.port
              }
              initial_delay_seconds = var.readinessProbe.initialDelaySeconds
              period_seconds        = var.readinessProbe.periodSeconds
              timeout_seconds       = var.readinessProbe.timeoutSeconds
              success_threshold     = var.readinessProbe.successThreshold
              failure_threshold     = var.readinessProbe.failureThreshold
            }
          }

          dynamic "startup_probe" {
            for_each = var.startupProbe != null ? [1] : []
            content {
              http_get {
                path = var.startupProbe.httpGet.path
                port = var.startupProbe.httpGet.port
              }
              initial_delay_seconds = var.startupProbe.initialDelaySeconds
              period_seconds        = var.startupProbe.periodSeconds
              timeout_seconds       = var.startupProbe.timeoutSeconds
              success_threshold     = var.startupProbe.successThreshold
              failure_threshold     = var.startupProbe.failureThreshold
            }
          }

          security_context {
            run_as_user     = lookup(var.containerSecurityContext, "runAsUser", 1000)
            run_as_group    = lookup(var.containerSecurityContext, "runAsGroup", 1000)
            run_as_non_root = lookup(var.containerSecurityContext, "runAsNonRoot", true)

            dynamic "capabilities" {
              for_each = { for k, v in var.containerSecurityContext.capabilities : k => v }
              content {
                add  = capabilities.value.add
                drop = capabilities.value.drop
              }
            }

            allow_privilege_escalation = lookup(var.containerSecurityContext, "allowPrivilegeEscalation", false)
            privileged                 = lookup(var.containerSecurityContext, "privileged", false)
          }

          working_dir = var.workingDir
        }

        dynamic "volume" {
          for_each = { for k, v in var.volumesFromConfig : k => v }
          content {
            name = volume.key
            config_map {
              name = volume.value.configMapName
            }
          }
        }

        dynamic "volume" {
          for_each = { for k, v in var.volumesFromSecret : k => v }
          content {
            name = volume.key
            secret {
              secret_name = volume.value.secretName
            }
          }
        }

        dynamic "volume" {
          for_each = { for k, v in var.volumesFromEmptyDir : k => v }
          content {
            name = volume.key
            empty_dir {}
          }
        }

        dynamic "volume" {
          for_each = { for k, v in var.volumesFromPVC : k => v }

          content {
            name = volume.key
            persistent_volume_claim {
              claim_name = volume.value.claimName
              read_only  = lookup(volume.value, "readOnly", false)
            }
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "app" {
  count = length(var.ports) >= 1 && var.enabled ? 1 : 0

  metadata {
    name        = var.name
    namespace   = var.namespace
    labels      = merge(local.defaultLabels, var.deploymentLabels)
    annotations = var.deploymentAnnotations
  }

  spec {
    type = var.serviceType
    selector = {
      "kubernetes.io/name" = var.name
    }

    dynamic "port" {
      for_each = { for k, v in var.ports : k => v }
      content {
        name        = "${port.value.istioProtocol}-${port.key}"
        port        = port.value.containerPort
        target_port = port.value.containerPort
        protocol    = lookup(port.value, "protocol", "TCP")
      }
    }
  }
}

resource "kubernetes_horizontal_pod_autoscaler_v2" "app" {
  count = var.autoscaling.enabled && var.enabled ? 1 : 0

  depends_on = [
    kubernetes_deployment.app
  ]

  metadata {
    name      = kubernetes_deployment.app[0].metadata[0].name
    namespace = kubernetes_deployment.app[0].metadata[0].namespace
    labels    = kubernetes_deployment.app[0].metadata[0].labels
  }

  spec {
    min_replicas = lookup(var.autoscaling, "minReplicas", 1)
    max_replicas = lookup(var.autoscaling, "maxReplicas", 3)

    scale_target_ref {
      api_version = "apps/v1"
      kind        = "Deployment"
      name        = kubernetes_deployment.app[0].metadata[0].name
    }

    dynamic "metric" {
      for_each = { for k, v in var.autoscaling.metrics : k => v }

      content {
        type = "Resource"
        resource {
          name = metric.key
          target {
            type                = "Utilization"
            average_utilization = lookup(metric.value, "targetAverageUtilization", 75)
          }
        }
      }
    }

    behavior {
      scale_down {
        select_policy                = "Max"
        stabilization_window_seconds = 0
        policy {
          type           = "Percent"
          period_seconds = 15
          value          = 100
        }
      }

      scale_up {
        select_policy                = "Max"
        stabilization_window_seconds = 0

        policy {
          type           = "Pods"
          period_seconds = 15
          value          = lookup(var.autoscaling, "maxReplicas", 3) + 1
        }

        policy {
          type           = "Percent"
          period_seconds = 15
          value          = 100
        }
      }
    }
  }
}
