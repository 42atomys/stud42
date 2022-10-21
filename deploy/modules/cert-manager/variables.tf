variable "acme_email" {
  type        = string
  description = "The email address to use for ACME registration"
  default     = "acme@s42.app"
}

variable "issuers" {
  type = map(object({
    is_self_signed          = bool
    acme_server             = optional(string)
    private_key_secret_name = optional(string)
    solvers = optional(list(object({
      dns01 = object({
        webhook = object({
          groupName  = string
          solverName = string
          config = object({
            endpoint       = string
            applicationKey = string
            applicationSecretRef = object({
              name = string
              key  = string
            })
            consumerKey = string
          })
        })
      })
    })))
  }))
  description = "The list of certificates to create"
}

variable "certificates" {
  type = map(object({
    namespace    = optional(string)
    dns_names    = list(string)
    issuer_kind  = optional(string)
    issuer_name  = string
    secret_name  = optional(string)
    duration     = optional(string)
    renew_before = optional(string)
  }))
  description = "The certificates to create"
}
