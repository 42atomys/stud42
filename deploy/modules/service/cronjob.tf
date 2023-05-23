resource "kubernetes_cron_job" "app" {
  count = var.enabled && var.kind == "CronJob" ? 1 : 0

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

    concurrency_policy            = var.jobConcurrencyPolicy
    failed_jobs_history_limit     = var.jobFailedJobsHistoryLimit
    successful_jobs_history_limit = var.jobSuccessfulJobsHistoryLimit
    starting_deadline_seconds     = var.jobStartingDeadlineSeconds
    schedule                      = var.jobSchedule
    suspend                       = var.jobSuspend

    job_template {
      metadata {
        labels      = merge(local.defaultLabels, var.deploymentLabels)
        annotations = var.deploymentAnnotations
      }

      spec {
        active_deadline_seconds    = var.jobActiveDeadlineSeconds
        backoff_limit              = var.jobBackoffLimit
        completions                = var.jobCompletions
        completion_mode            = var.jobCompletionMode
        ttl_seconds_after_finished = var.jobTTLSecondsAfterFinished
        parallelism                = var.jobParallelism

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

            restart_policy                  = var.restartPolicy
            node_selector                   = var.nodeSelector
            service_account_name            = var.serviceAccountName
            automount_service_account_token = var.automountServiceAccountToken

            dynamic "toleration" {
              for_each = { for k, v in var.tolerations : k => v }
              content {
                key      = toleration.key
                operator = toleration.value.operator
                value    = toleration.value.value
                effect   = toleration.value.effect
              }
            }

            dynamic "init_container" {
              for_each = { for k, v in var.volumeMounts : k => v if var.fixPermissions == true && v.readOnly == false }

              content {
                name  = "fix-permissions-${init_container.key}"
                image = "busybox"
                command = [
                  "chown",
                  "-R",
                  "${var.containerSecurityContext.runAsUser}:${var.containerSecurityContext.runAsGroup}",
                  init_container.value.mountPath,
                ]

                security_context {
                  run_as_group    = 0
                  run_as_user     = 0
                  run_as_non_root = false
                }

                volume_mount {
                  name              = init_container.value.volumeName
                  mount_path        = init_container.value.mountPath
                  read_only         = lookup(init_container.value, "readOnly", false)
                  sub_path          = lookup(init_container.value, "subPath", null)
                  mount_propagation = lookup(init_container.value, "mountPropagation", null)
                }
              }
            }

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

            dynamic "volume" {
              for_each = { for k, v in var.volumesFromHostPath : k => v }
              content {
                name = volume.key
                host_path {
                  path = volume.value.hostPath
                  type = volume.value.type
                }
              }
            }
          }
        }
      }
    }
  }
}
