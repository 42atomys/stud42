variable "enabled" {
  type        = bool
  description = "Whether the module should be deployed or not"
  default     = true
}

variable "sealedSecretsControllerName" {
  type        = string
  description = "The name of the sealed secrets controller"
  default     = "sealed-secrets-controller"
}


variable "sealedSecretsControllerNamespace" {
  type        = string
  description = "The namespace of the sealed-secrets controller has deployed"
  default     = "kube-system"
}

variable "sealedSecrets" {
  type = map(object({
    namespace     = optional(string, "kube-system")
    isClusterWide = optional(bool, false)
    secretType    = optional(string, "Opaque")
    encryptedData = map(string)
    reflected     = optional(bool, false)
    // Omit the following properties if reflected is true result to reflect in
    // all namespaces
    reflectedNamespaces = optional(list(string), [])
  }))
  description = "The sealed secrets to be deployed"
  default     = {}
}
