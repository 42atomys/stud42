variable "namespace" {
  type        = string
  description = "Namespace of the application"
  default     = "sandbox"
}

variable "appVersion" {
  type        = string
  description = "Version of the application"
  default     = "latest"
}

variable "rootDomain" {
  type        = string
  description = "Root domain of the application"
  default     = "sandbox.s42.dev"
}

variable "hasProvidedJWTKSCertificates" {
  type        = bool
  description = "Whether the jwtks secret needs to be created or not (must be executed after make build/Makefile certs)"
  default     = false
}
