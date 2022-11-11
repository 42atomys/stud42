module "istio" {
  source = "../../../modules/istio"

  virtual_services = {
    "${local.reversedRootDomain}" = {
      namespace = var.namespace
      hosts     = [var.rootDomain]
      gateways  = [local.reversedRootDomain]
      http = [
        {
          name = "jwtks-service"
          match = [
            {
              uri = {
                prefix = "/.well-known/jwks"
              }
              method = {
                exact = "GET"
              }
            }
          ]
          rewrite = {
            uri = "/jwks"
          }
          route = [
            {
              destination = {
                host = "jwtks-service.${var.namespace}.svc.cluster.local"
                port = {
                  number = 5500
                }
              }
            }
          ]
        },
        {
          name = "webhooked"
          match = [
            {
              uri = {
                prefix = "/webhooks/v1alpha1"
              }
              method = {
                exact = "POST"
              }
            }
          ]
          rewrite = {
            uri = "/v1alpha1"
          }
          route = [
            {
              destination = {
                host = "webhooked.${var.namespace}.svc.cluster.local"
                port = {
                  number = 8080
                }
              }
            }
          ]
        },
        {
          name = "api-gql"
          match = [
            {
              uri = {
                exact = "/graphql"
              }
              method = {
                exact = "POST"
              }
            }
          ]
          rewrite = {
            uri = "/graphql"
          }
          route = [
            {
              destination = {
                host = "api.${var.namespace}.svc.cluster.local"
                port = {
                  number = 4000
                }
              }
            }
          ]
        },
        {
          name = "api-gqli"
          match = [
            {
              uri = {
                exact = "/graphql"
              }
              method = {
                exact = "GET"
              }
            }
          ]
          rewrite = {
            uri = "/"
          }
          route = [
            {
              destination = {
                host = "api.${var.namespace}.svc.cluster.local"
                port = {
                  number = 4000
                }
              }
            }
          ]
        },
        {
          name = "interface"
          match = [
            {
              uri = {
                prefix = "/"
              }
            }
          ]
          route = [
            {
              destination = {
                host = "interface.${var.namespace}.svc.cluster.local"
                port = {
                  number = 3000
                }
              }
            }
          ]
        },
      ]
    }
  }
}
