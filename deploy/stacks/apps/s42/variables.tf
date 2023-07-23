variable "namespace" {
  type        = string
  description = "Namespace of the application"
}

variable "appVersion" {
  type        = string
  description = "Version of the application"
}

variable "rootDomain" {
  type        = string
  description = "Root domain of the application"
}

variable "webhookProcessorEnabled" {
  type        = bool
  description = "Enable the webhooks processor for the application"
  default     = false
}

variable "hasPersistentStorage" {
  type        = bool
  description = "Enable persistent storage for the application"
  default     = false
}

variable "crawlerEnabled" {
  type        = bool
  description = "Enable the crawler for the application"
  default     = false
}
