variable "name" {
  type        = string
  description = "Name of the service"

  validation {
    condition     = can(regex("^[a-z0-9-]+$", var.name))
    error_message = "The name must be lowercase alphanumeric characters and hyphens only."
  }
}

variable "namespace" {
  type        = string
  description = "Namespace of the service"

  validation {
    condition     = can(regex("^[a-z0-9-]+$", var.namespace))
    error_message = "The namespace must be lowercase alphanumeric characters and hyphens only."
  }
}

variable "appVersion" {
  type        = string
  description = "Version of the service"

  validation {
    condition     = can(regex("^(latest|pr-[0.9]+|v?[0-9\\.]+(?:-rc\\.[0-9]+)?)$", var.appVersion)) # disable v prefix for now
    error_message = "The version must be respect the semver 2.0.0 convention (or latest). Got: ${var.appVersion}"
  }
}

variable "appName" {
  type        = string
  description = "Name of the application"
  default     = "s42"

  validation {
    condition     = can(regex("^[a-z0-9-]+$", var.appName))
    error_message = "The namespace must be lowercase alphanumeric characters and hyphens only."
  }
}

variable "enabled" {
  type        = bool
  description = "Enable or disable the service"
  default     = true
}

variable "replicas" {
  type        = number
  description = "Number of replicas"
  default     = 1

  validation {
    condition     = var.replicas > 0
    error_message = "The number of replicas must be greater than 0."
  }
}

variable "revisionHistoryLimit" {
  type        = number
  description = "Revision history limit"
  default     = 2

  validation {
    condition     = var.revisionHistoryLimit > 0
    error_message = "The revision history limit must be greater than 0."
  }
}

variable "maxSurge" {
  type        = number
  description = "Maximum number of pods that can be created above the desired number of pods"
  default     = 1

  validation {
    condition     = var.maxSurge > 0
    error_message = "The maximum surge must be greater than 0."
  }
}

variable "maxUnavailable" {
  type        = number
  description = "Maximum number of pods that can be unavailable during the update"
  default     = 0

  validation {
    condition     = var.maxUnavailable >= 0
    error_message = "The maximum unavailable must be greater or equal than 0."
  }
}

variable "kind" {
  type        = string
  description = "Kind of the app"
  default     = "Deployment"

  validation {
    condition     = can(regex("^(Deployment|StatefulSet|CronJob|DaemonSet)$", var.kind))
    error_message = "The kind must be either Deployment, StatefulSet or CronJob."
  }
}

variable "updateStrategy" {
  type        = string
  description = "Update strategy"
  default     = "RollingUpdate"

  validation {
    condition     = can(regex("^(RollingUpdate|Recreate)$", var.updateStrategy))
    error_message = "The update strategy must be either RollingUpdate or Recreate."
  }
}

variable "updatePartition" {
  type        = number
  description = "The partition of the update"
  default     = 0

  validation {
    condition     = var.updatePartition >= 0
    error_message = "The update partition must be greater or equal than 0."
  }
}

variable "podManagementPolicy" {
  type        = string
  description = "Pod management policy"
  default     = "OrderedReady"

  validation {
    condition     = can(regex("^(OrderedReady|Parallel)$", var.podManagementPolicy))
    error_message = "The pod management policy must be either OrderedReady or Parallel."
  }
}

variable "restartPolicy" {
  type        = string
  description = "Restart policy"
  default     = "Always"

  validation {
    condition     = can(regex("^(Always|OnFailure|Never)$", var.restartPolicy))
    error_message = "The restart policy must be either Always, OnFailure or Never."
  }
}

variable "jobConcurrencyPolicy" {
  type        = string
  description = "Concurrency policy"
  default     = "Forbid"

  validation {
    condition     = can(regex("^(Forbid|Replace|Allow)$", var.jobConcurrencyPolicy))
    error_message = "The concurrency policy must be either Forbid, Replace or Allow."
  }
}

variable "jobFailedJobsHistoryLimit" {
  type        = number
  description = "Failed jobs history limit"
  default     = 2

  validation {
    condition     = var.jobFailedJobsHistoryLimit >= 0
    error_message = "The failed jobs history limit must be greater or equal than 0."
  }
}

variable "jobSuccessfulJobsHistoryLimit" {
  type        = number
  description = "Successful jobs history limit"
  default     = 1

  validation {
    condition     = var.jobSuccessfulJobsHistoryLimit >= 0
    error_message = "The successful jobs history limit must be greater or equal than 0."
  }
}

variable "jobStartingDeadlineSeconds" {
  type        = number
  description = "Starting deadline seconds"
  default     = 0

  validation {
    condition     = var.jobStartingDeadlineSeconds >= 0
    error_message = "The starting deadline seconds must be greater or equal than 0."
  }
}

variable "jobSchedule" {
  type        = string
  description = "Schedule of the job based on the cron format"
  default     = ""
}

variable "jobSuspend" {
  type        = bool
  description = "This flag tells the controller to suspend subsequent executions, it does not apply to already started executions. Defaults to false."
  default     = false
}

variable "jobActiveDeadlineSeconds" {
  type        = number
  description = "Specifies the duration in seconds relative to the startTime that the job may be active before the system tries to terminate it in. Defaults to 0."
  default     = 600 # 10 minutes by default, this is to prevent jobs from running forever

  validation {
    condition     = var.jobActiveDeadlineSeconds >= 0
    error_message = "The active deadline seconds must be greater than 0."
  }
}

variable "jobBackoffLimit" {
  type        = number
  description = "The number of retries before considering a job as failed. Defaults to 0."
  default     = 0

  validation {
    condition     = var.jobBackoffLimit >= 0
    error_message = "The backoff limit must be greater or equals than 0."
  }
}

variable "jobCompletions" {
  type        = number
  description = "The number of desired completions. Defaults to 1."
  default     = 1

  validation {
    condition     = var.jobCompletions >= 0
    error_message = "The completions must be greater or equal than 0."
  }
}

variable "jobCompletionMode" {
  type        = string
  description = "Specifies how Pod completions are tracked. It can be either `NonIndexed` (default) or `Indexed`."
  default     = "NonIndexed"

  validation {
    condition     = can(regex("^(NonIndexed|Indexed)$", var.jobCompletionMode))
    error_message = "The completion mode must be either NonIndexed or Indexed."
  }
}

variable "jobTTLSecondsAfterFinished" {
  type        = number
  description = "TTLSecondsAfterFinished limits the lifetime of a Job that has finished execution (either Complete or Failed). If this field is set, ttlSecondsAfterFinished after the Job finishes, it is eligible to be automatically deleted. When the Job is being deleted, its lifecycle guarantees (e.g. finalizers) will be honored. If this field is unset, the Job won't be automatically deleted. If this field is set to zero, the Job becomes eligible to be deleted immediately after it finishes. This field is alpha-level and is only honored by servers that enable the TTLAfterFinished feature."
  default     = 0

  validation {
    condition     = var.jobTTLSecondsAfterFinished >= 0
    error_message = "The TTL seconds after finished must be greater or equal than 0."
  }
}

variable "jobParallelism" {
  type        = number
  description = "The maximum desired number of pods the job should run at any given time. Defaults to 1."
  default     = 1

  validation {
    condition     = var.jobParallelism >= 0
    error_message = "The parallelism must be greater or equal than 0."
  }
}

variable "imagePullSecrets" {
  type        = list(string)
  description = "List of image pull secrets"
  default     = []
}

variable "nodeSelector" {
  type        = map(string)
  description = "Node selector for the pod assignment"
  default     = {}
}

variable "tolerations" {
  type = map(object({
    effect            = optional(string, "NoSchedule")
    operator          = string
    tolerationSeconds = optional(number)
    value             = optional(string)
  }))
  description = "List of tolerations for the pod assignment"
  default     = {}
}

variable "serviceAccountName" {
  type        = string
  description = "Service account name"
  default     = null
}

variable "automountServiceAccountToken" {
  type        = bool
  description = "Automount service account token"
  default     = true
}

variable "image" {
  type        = string
  description = "Image of the service"

  validation {
    condition     = can(regex("^(?:[a-z0-9-\\.]+\\/)+[a-z0-9-]+:[a-z0-9.-]+$", var.image))
    error_message = "The image must be in the format <registry>/<repository>:<tag>"
  }
}

variable "imagePullPolicy" {
  type        = string
  description = "Image pull policy"
  default     = "IfNotPresent"

  validation {
    condition     = can(regex("^(Always|IfNotPresent|Never)$", var.imagePullPolicy))
    error_message = "The image pull policy must be one of Always, IfNotPresent, or Never."
  }
}

variable "command" {
  type        = list(string)
  description = "Command to run in the container"
  default     = []
}

variable "args" {
  type        = list(string)
  description = "Arguments to pass to the command"
  default     = []
}

variable "env" {
  type        = map(string)
  description = "Environment variables to pass to the container"
  default     = {}
}

variable "envFromSecret" {
  type = map(object({
    name = string
    key  = string
  }))
  description = "Secret to use as environment variables"
  default     = {}
}

variable "envFromConfigMap" {
  type = map(object({
    name = string
    key  = string
  }))
  description = "ConfigMap to use as environment variables"
  default     = {}
}

variable "envFromFieldRef" {
  type = map(object({
    field_path = string
  }))
  description = "FieldRef to use as environment variables"
  default     = {}
}

variable "ports" {
  type = map(object({
    containerPort = number
    protocol      = optional(string, "TCP")
    istioProtocol = optional(string, "http")
  }))
  description = "List of ports to expose"
  default     = {}

  validation {
    // protocol must be TCP, UDP or SCTP
    // https://kubernetes.io/docs/concepts/services-networking/service/#protocol-support
    condition = alltrue([
      for p in var.ports : contains(["TCP", "UDP", "SCTP"], p.protocol)
    ])
    error_message = "The protocol must be one of TCP, UDP, or SCTP."
  }

  validation {
    // istioProtocol must be http, http2, https, grpc, grpc-web, tls, or tcp
    // https://istio.io/latest/docs/ops/configuration/traffic-management/protocol-selection/#explicit-protocol-selection
    condition = alltrue([
      for p in var.ports : contains(["http", "http2", "https", "grpc", "grpc-web", "tls", "tcp", "udp"], p.istioProtocol)
    ])
    error_message = "The istioProtocol must be one of http, http2, https, grpc, grpc-web, tls, tcp or udp."
  }
}

variable "resources" {
  type = object({
    limits = optional(object({
      cpu    = optional(string)
      memory = optional(string, "128Mi")
    }), null)
    requests = optional(object({
      cpu    = optional(string, "100m")
      memory = optional(string, "128Mi")
    }), null)
  })
  description = "Resources to request and limit"
  default     = {}
}

variable "volumeMounts" {
  type = list(object({
    mountPath        = string
    volumeName       = string
    readOnly         = optional(bool, false)
    subPath          = optional(string, null)
    mountPropagation = optional(string, null)
  }))
  description = "List of volumes to mount"
  default     = []
}

variable "livenessProbe" {
  type = object({
    httpGet = optional(object({
      path   = optional(string, "/livez")
      port   = optional(string, "http")
      scheme = optional(string, "HTTP")
    }), null)
    initialDelaySeconds = optional(number, 10)
    timeoutSeconds      = optional(number, 5)
    periodSeconds       = optional(number, 10)
    successThreshold    = optional(number, 1)
    failureThreshold    = optional(number, 3)
  })
  description = "Liveness probe configuration"
  default     = null
}

variable "readinessProbe" {
  type = object({
    httpGet = optional(object({
      path   = optional(string, "/readyz")
      port   = optional(string, "http")
      scheme = optional(string, "HTTP")
    }), null)
    initialDelaySeconds = optional(number, 10)
    timeoutSeconds      = optional(number, 5)
    periodSeconds       = optional(number, 10)
    successThreshold    = optional(number, 1)
    failureThreshold    = optional(number, 3)
  })
  description = "Readiness probe configuration"
  default     = null
}

variable "startupProbe" {
  type = object({
    httpGet = optional(object({
      path   = optional(string, "/readyz")
      port   = optional(string, "http")
      scheme = optional(string, "HTTP")
    }), null)
    initialDelaySeconds = optional(number, 10)
    timeoutSeconds      = optional(number, 5)
    periodSeconds       = optional(number, 10)
    successThreshold    = optional(number, 1)
    failureThreshold    = optional(number, 3)
  })
  description = "Startup probe configuration"
  default     = null
}

variable "podSecurityContext" {
  type = object({
    runAsNonRoot        = optional(bool, true)
    runAsGroup          = optional(number, 1000)
    fsGroup             = optional(number, 1000)
    fsGroupChangePolicy = optional(string, "OnRootMismatch")
    supplementalGroups  = optional(list(number), [])
  })
  description = "Security context configuration for pod"
  default     = {}
}

variable "containerSecurityContext" {
  type = object({
    allowPrivilegeEscalation = optional(bool, false)
    capabilities = optional(map(object({
      add  = optional(list(string), [])
      drop = optional(list(string), [])
    })), {})
    privileged   = optional(bool, false)
    runAsNonRoot = optional(bool, true)
    runAsUser    = optional(number, 1000)
    runAsGroup   = optional(number, 1000)
  })
  description = "Security context configuration for container"
  default     = {}
}

variable "workingDir" {
  type        = string
  description = "Working directory of the container"
  default     = null
}

variable "volumesFromConfig" {
  type = map(object({
    configMapName = string
  }))
  description = "ConfigMap to use as volumes"
  default     = {}
}

variable "volumesFromSecret" {
  type = map(object({
    secretName = string
  }))
  description = "Secret to use as volumes"
  default     = {}
}

variable "volumesFromPVC" {
  type = map(object({
    claimName = string
    readOnly  = optional(bool, false)
  }))
  description = "PVC to use as volumes"
  default     = {}
}

variable "volumesFromHostPath" {
  type = map(object({
    hostPath = string
    type     = optional(string, "")
  }))
  description = "HostPath to use as volumes"
  default     = {}
}

variable "volumesFromEmptyDir" {
  type        = map(object({}))
  description = "EmptyDir to use as volumes"
  default     = {}
}

variable "waitForRollout" {
  type        = bool
  description = "Wait for the rollout to complete"
  default     = true
}

variable "autoscaling" {
  type = object({
    enabled     = bool
    minReplicas = optional(number, 1)
    maxReplicas = optional(number, 3)
    metrics = optional(map(object({
      targetAverageUtilization = optional(number, 75)
    })), {})
  })
  description = "Autoscaling configuration"
  default = {
    enabled = false
  }
}


variable "certificates" {
  type = map(object({
    issuerRefName = string
    issuerRefKind = string
    dnsNames      = list(string)
  }))
  description = "Certificates needed by the application (not automounted)"
  default     = {}
}

variable "configMaps" {
  type = map(object({
    immutable = optional(bool, false)
    data      = map(string)
  }))
  description = "ConfigMaps needed by the application (not automounted)"
  default     = {}
}

variable "secrets" {
  type = map(object({
    immutable = optional(bool, false)
    type      = optional(string, "Opaque")
    data      = map(string)
  }))
  description = "Secrets needed by the application (not automounted)"
  default     = {}
}

variable "persistentVolumeClaims" {
  type = map(object({
    storageClassName = optional(string, "csi-cinder-classic")
    accessModes      = list(string)
    volumeName       = optional(string)
    storage          = string
  }))
  description = "PersistentVolumeClaims needed by the application (not automounted)"
  default     = {}
}

variable "deploymentLabels" {
  type        = map(string)
  description = "Labels to add to the Deployment"
  default     = {}
}

variable "deploymentAnnotations" {
  type        = map(string)
  description = "Annotations to add to the Deployment"
  default     = {}
}

variable "podLabels" {
  type        = map(string)
  description = "Labels to add to the pod"
  default     = {}
}

variable "podAnnotations" {
  type        = map(string)
  description = "Annotations to add to the pod"
  default     = {}
}

variable "prometheus" {
  type = object({
    enabled = bool
    port    = optional(number, 8080)
    path    = optional(string, "/metrics")
  })
  description = "Prometheus configuration"
  default = {
    enabled = false
  }
}

variable "serviceType" {
  type        = string
  description = "Type of the service"
  default     = "ClusterIP"

  validation {
    condition     = contains(["ClusterIP", "NodePort", "LoadBalancer"], var.serviceType)
    error_message = "serviceType must be one of ClusterIP, NodePort or LoadBalancer"
  }
}
