variable "namespace" {
  type        = string
  description = "The namespace to deploy the application to"
  default     = "default"
}

variable "appsVersion" {
  type        = map(string)
  description = "The version of the application to deploy"

  default = {
    s42 = "latest"
  }

  validation {
    condition     = alltrue([for k, v in var.appsVersion : contains(["s42"], k)])
    error_message = "The appsVersion variable must contain a key for each application to be deployed"
  }
}

variable "baseUrl" {
  type        = string
  description = "The base URL for the application"
  default     = "s42.app"
}
variable "webhooksEnabled" {
  type        = bool
  description = "Whether the webhooks workflow should be deployed or not"
  default     = false
}

variable "crawlerEnabled" {
  type        = bool
  description = "Whether the crawler should be deployed or not"
  default     = false
}

variable "hasProvidedJWTKSCertificates" {
  type        = bool
  description = "Whether the jwtks secret needs to be created or not (must be executed after make build/Makefile certs)"
  default     = false
}


variable "hasPersistentStorage" {
  type        = bool
  description = "Whether the application should use persistent storage or not"
  default     = false
}
