resource "kubernetes_deployment" "app" {
  metadata {
    name      = var.name
    namespace = var.namespace
    labels = {
      "app"                          = var.appName
      "version"                      = var.appVersion
      "kubernetes.io/name"           = var.name
      "app.kubernetes.io/version"    = var.appVersion
      "app.kubernetes.io/part-of"    = var.appName
      "app.kubernetes.io/managed-by" = "terraform"
      "app.kubernetes.io/created-by" = "github-actions"
    }
  }

  spec {
    replicas = var.replicas
    selector {
      match_expressions {
        key      = "kubernetes.io/name"
        operator = "In"
        values   = [var.name]
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
      spec {
        image_pull_secrets {
          name = "ghcr-creds"
        }
        image_pull_secrets {
          for_each = var.imagePullSecrets
          name     = each.value
        }
        node_selector = var.nodeSelector
        container {
          name              = var.name
          image             = var.image
          image_pull_policy = lookup(var, "imagePullPolicy", "IfNotPresent")
          command           = lookup(var, "command", null)
          args              = var.args != null ? var.args : []
          env {
            name = "S42_SERVICE_TOKEN"
            value_from {
              secret_key_ref {
                name     = "s42-service-token"
                key      = "TOKEN"
                optional = false
              }
            }
          }

          env {
            for_each = var.env
            name     = each.key
            value    = each.value
          }

          env {
            for_each = { for k, v in var.envFromSecret : k => v }
            name     = each.key
            value_from {
              secret_key_ref {
                name = each.value.name
                key  = each.value.key
              }
            }
          }

          env {
            for_each = { for k, v in var.envFromConfigMap : k => v }
            name     = each.key
            value_from {
              config_map_key_ref {
                name = each.value.name
                key  = each.value.key
              }
            }
          }

          env {
            for_each = { for k, v in var.envFromFieldRef : k => v }
            name     = each.key
            value_from {
              field_ref {
                field_path = each.value.field_path
              }
            }
          }

          port {
            for_each       = { for k, v in var.ports : k => v }
            name           = each.key
            container_port = each.value.container_port
            protocol       = lookup(each.value, "protocol", "TCP")
          }

          resources {
            requests = var.resources.requests != null ? {
              cpu    = lookup(var.resources.requests, "cpu", "100m")
              memory = lookup(var.resources.requests, "memory", "128Mi")
            } : {}
            limits = var.resources.limits != null ? {
              cpu    = lookup(var.resources.limits, "cpu", "100m")
              memory = lookup(var.resources.limits, "memory", "128Mi")
            } : {}
          }

          volume_mount {
            for_each          = { for k, v in var.volumeMounts : k => v }
            name              = each.key
            mount_path        = each.value.mountPath
            read_only         = lookup(each.value, "readOnly", false)
            sub_path          = lookup(each.value, "subPath", null)
            mount_propagation = lookup(each.value, "mountPropagation", null)
          }

          liveness_probe {
            count = var.livenessProbe != null ? 1 : 0
            http_get {
              path   = lookup(var.livenessProbe, "path", "/healthz")
              port   = lookup(var.livenessProbe, "port", "http")
              scheme = lookup(var.livenessProbe, "scheme", "HTTP")
            }
            initial_delay_seconds = lookup(var.livenessProbe, "initialDelaySeconds", 10)
            period_seconds        = lookup(var.livenessProbe, "periodSeconds", 10)
            timeout_seconds       = lookup(var.livenessProbe, "timeoutSeconds", 5)
            success_threshold     = lookup(var.livenessProbe, "successThreshold", 1)
            failure_threshold     = lookup(var.livenessProbe, "failureThreshold", 3)
          }

          readiness_probe {
            count = var.readinessProbe != null ? 1 : 0
            http_get {
              path = lookup(var.readinessProbe, "path", "/readyz")
              port = lookup(var.readinessProbe, "port", "http")
            }
            initial_delay_seconds = lookup(var.readinessProbe, "initialDelaySeconds", 10)
            period_seconds        = lookup(var.readinessProbe, "periodSeconds", 10)
            timeout_seconds       = lookup(var.readinessProbe, "timeoutSeconds", 5)
            success_threshold     = lookup(var.readinessProbe, "successThreshold", 1)
            failure_threshold     = lookup(var.readinessProbe, "failureThreshold", 3)
          }

          startup_probe {
            count = var.startupProbe != null ? 1 : 0
            http_get {
              path = lookup(var.startupProbe, "path", "/readyz")
              port = lookup(var.startupProbe, "port", "http")
            }
            initial_delay_seconds = lookup(var.startupProbe, "initialDelaySeconds", 10)
            period_seconds        = lookup(var.startupProbe, "periodSeconds", 10)
            timeout_seconds       = lookup(var.startupProbe, "timeoutSeconds", 5)
            success_threshold     = lookup(var.startupProbe, "successThreshold", 1)
            failure_threshold     = lookup(var.startupProbe, "failureThreshold", 3)
          }

          security_context {
            run_as_user     = lookup(var.securityContext, "runAsUser", 1000)
            run_as_group    = lookup(var.securityContext, "runAsGroup", 1000)
            run_as_non_root = lookup(var.securityContext, "runAsNonRoot", true)
            capabilities {
              for_each = { for k, v in var.securityContext.capabilities : k => v }
              add      = each.value.add
              drop     = each.value.drop
            }
            allow_privilege_escalation = lookup(var.securityContext, "allowPrivilegeEscalation", false)
            privileged                 = lookup(var.securityContext, "privileged", false)
          }

          working_dir = lookup(var, "workingDir", null)
        }

        volumes {
          for_each = { for k, v in var.volumesFromConfig : k => v }
          name     = each.key
          config_map {
            name = each.value.configMapName
          }
        }

        volumes {
          for_each = { for k, v in var.volumesFromSecret : k => v }
          name     = each.key
          secret {
            secret_name = each.value.secretName
          }
        }

        volumes {
          for_each = { for k, v in var.volumesFromEmptyDir : k => v }
          name     = each.key
          empty_dir {}
        }

        volume {
          for_each = { for k, v in var.volumesFromPVC : k => v }
          name     = each.key
          persistent_volume_claim {
            claim_name = each.value.claimName
            read_only  = lookup(each.value, "readOnly", false)
          }
        }
      }
    }
  }

  wait_for_rollout = var.waitForRollout
}


resource "kubernetes_service" "app" {
  depends_on = [
    kubernetes_deployment.app
  ]

  metadata {
    name      = kubernetes_deployment.app.metadata[0].name
    namespace = kubernetes_deployment.app.metadata[0].namespace
    labels    = kubernetes_deployment.app.metadata[0].labels
  }

  spec {
    type     = lookup(var, "serviceType", "ClusterIP")
    selector = kubernetes_deployment.app.spec[0].selector[0].match_labels

    port {
      for_each    = { for k, v in var.ports : k => v }
      name        = each.key
      port        = each.value.container_port
      target_port = each.value.container_port
      protocol    = lookup(each.value, "protocol", "TCP")
    }
  }
}

resource "kubernetes_horizontal_pod_autoscaler_v2" "app" {
  count = var.autoscaling.enabled ? 1 : 0

  depends_on = [
    kubernetes_deployment.app
  ]

  metadata {
    name      = kubernetes_deployment.app.metadata[0].name
    namespace = kubernetes_deployment.app.metadata[0].namespace
    labels    = kubernetes_deployment.app.metadata[0].labels
  }

  spec {
    min_replicas = lookup(var.autoscaling, "minReplicas", 1)
    max_replicas = lookup(var.autoscaling, "maxReplicas", 3)

    scale_target_ref {
      api_version = "apps/v1"
      kind        = "Deployment"
      name        = kubernetes_deployment.app.metadata[0].name
    }

    metric {
      for_each = { for k, v in var.autoscaling.metrics : k => v }
      type     = "Resource"
      resource {
        name = each.key
        target {
          type                = "Utilization"
          average_utilization = lookup(each.value, "targetAverageUtilization", 75)
        }
      }
    }

    behavior {
      scale_up {
        stabilization_window_seconds = lookup(var.autoscaling, "scaleUpStabilizationWindowSeconds", 0)
      }
      scale_down {
        stabilization_window_seconds = lookup(var.autoscaling, "scaleDownStabilizationWindowSeconds", 60)
      }
    }
  }
}

resource "kubernetes_manifest" "certificate" {
  for_each = { for k, v in var.certificates : k => v }

  depends_on = [
    kubernetes_deployment.app
  ]

  manifest = {
    apiVersion = "cert-manager.io/v1"
    kind       = "Certificate"
    metadata = {
      name      = "${kubernetes_deployment.app.metadata[0].name}-${each.key}"
      namespace = kubernetes_deployment.app.metadata[0].namespace
      labels    = kubernetes_deployment.app.metadata[0].labels
    }
    spec = {
      secretName = "${kubernetes_deployment.app.metadata[0].name}-${each.key}-tls"
      issuerRef = {
        name = each.value.issuerRefName
        kind = each.value.issuerRefKind
      }
      dnsNames = each.value.dnsNames
    }
  }
}

resource "kubernetes_config_map" "app" {
  for_each = { for k, v in var.configMaps : k => v }

  depends_on = [
    kubernetes_deployment.app
  ]

  metadata {
    name      = "${kubernetes_deployment.app.metadata[0].name}-${each.key}"
    namespace = kubernetes_deployment.app.metadata[0].namespace
    labels    = kubernetes_deployment.app.metadata[0].labels
  }

  immutable = lookup(each.value, "immutable", false)
  data      = each.value.data
}
