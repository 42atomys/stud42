variable "gateways" {
  description = "The list of gateways to create"
  type = map(object({
    namespace           = string
    ingressSelectorName = string
    serverHttpsRedirect = bool
    hosts               = list(string)
    tlsMode             = string
    tlsCredentialName   = string

    extraServers = optional(list(object({
      port = object({
        number   = number
        name     = string
        protocol = string
      })
      hosts = list(string)
      tls = optional(object({
        mode           = optional(string)
        credentialName = optional(string)
        httpsRedirect  = optional(bool, false)
      }))
    })), [])
  }))
}

variable "virtual_services" {
  description = "The list of virtual services to create"
  type = map(object({
    namespace = string
    hosts     = list(string)
    gateways  = list(string)
    http = optional(list(object({
      name = string

      match = optional(list(object({
        uri = optional(object({
          exact  = optional(string)
          prefix = optional(string)
        }))
        method = optional(object({
          exact = optional(string)
        }))
      })))

      rewrite = optional(object({
        uri = string
      }))

      route = list(object({
        destination = object({
          host = string
          port = optional(object({
            number = number
          }))
        })
      }))
    })), [])
  }))
}
