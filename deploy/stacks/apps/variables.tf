variable "namespace" {
  type        = string
  description = "The namespace to deploy the application to"
  default     = "default"
}

variable "appsVersion" {
  type        = map(string)
  description = "The version of the application to deploy"

  default = {
    webhooked = "latest"
    s42       = "latest"
  }

  validation {
    condition = alltrue([for k, v in var.appsVersion : contains(["webhooked", "s42"], k) && v != "latest"])

    error_message = "The appsVersion variable must contain a key for each application to be deployed"
  }
}

variable "baseUrl" {
  type        = string
  description = "The base URL for the application"
  default     = "s42.app"
}

variable "jwtksSecretNeedsToBeCreated" {
  type        = bool
  description = "Whether the jwtks secret needs to be created or not (must be executed after `make build/Makefile certs`)"
  default     = false
}
