variable "pull_request_number" {
  type        = number
  description = "The pull request number"
  validation {
    condition     = var.pull_request_number > 1
    error_message = "The pull request number must be greater than 1."
  }
}
