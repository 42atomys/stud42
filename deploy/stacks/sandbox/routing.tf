module "istio" {
  source = "../../modules/istio"

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
          name = "jwtks-service-public-sign"
          route = [{
            destination = {
              host = "jwtks-service.${var.namespace}.svc.cluster.local"
              port = {
                number = 5000
              }
            }
          }]
        }
      ]
    }
  }
}
