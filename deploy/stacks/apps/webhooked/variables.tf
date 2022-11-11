variable "enabled" {
  type        = bool
  description = "Whether the webhooked application should be deployed or not"
  default     = true
}

variable "namespace" {
  type        = string
  description = "Namespace of the application"
}


variable "appVersion" {
  type        = string
  description = "Version of the application"
}
