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
    condition     = can(regex("^v?[0-9.]+$", var.appVersion)) # disable v prefix for now
    error_message = "The version must be numeric characters and periods only and start with a v."
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
    condition     = can(regex("^(Deployment|StatefulSet)$", var.kind))
    error_message = "The kind must be either Deployment or StatefulSet."
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
    istioProtocol = optional(string, "http2")
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
      for p in var.ports : contains(["http", "http2", "https", "grpc", "grpc-web", "tls", "tcp"], p.istioProtocol)
    ])
    error_message = "The istioProtocol must be one of http, http2, https, grpc, grpc-web, tls, or tcp."
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
    runAsNonRoot       = optional(bool, true)
    runAsGroup         = optional(number, 1000)
    fsGroup            = optional(number, 1000)
    supplementalGroups = optional(list(number), [])
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
