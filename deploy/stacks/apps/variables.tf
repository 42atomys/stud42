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
  }

  validation {
    condition = alltrue([for k, v in var.appsVersion : contains(["webhooked"], k) && v != "latest"])

    error_message = "The appsVersion variable must contain a key for each application to be deployed"
  }
}
