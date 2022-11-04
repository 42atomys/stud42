module "istio" {
  source = "../../modules/istio"

  gateways = {
    "app-s42" = {
      ingressSelectorName = "ingressgateway"
      namespace           = "production"
      serverHttpsRedirect = true
      hosts               = ["s42.app", "*.s42.app"]
      tlsMode             = "SIMPLE"
      tlsCredentialName   = "app-s42-tls"
    },
    "app-s42-next" = {
      ingressSelectorName = "ingressgateway"
      namespace           = "staging"
      serverHttpsRedirect = true
      hosts               = ["next.s42.app", "*.next.s42.app"]
      tlsMode             = "SIMPLE"
      tlsCredentialName   = "app-s42-next-tls"
    },
    "dev-s42" = {
      ingressSelectorName = "ingressgateway"
      namespace           = "sandbox"
      serverHttpsRedirect = true
      hosts               = ["s42.dev", "*.s42.dev", "*.sandbox.s42.dev"]
      tlsMode             = "SIMPLE"
      tlsCredentialName   = "dev-s42-tls"
      extraServers = [
        {
          port = {
            number   = 51000
            name     = "grpc"
            protocol = "GRPC"
          }
          hosts = ["sandbox.s42.dev"]
        }
      ]
    }
    "dev-s42-previews" = {
      ingressSelectorName = "ingressgateway"
      namespace           = "previews"
      serverHttpsRedirect = true
      hosts               = ["*.previews.s42.dev"]
      tlsMode             = "SIMPLE"
      tlsCredentialName   = "dev-s42-previews-tls"
    }
  }

  virtual_services = {
    "app-s42" = {
      namespace = "production"
      hosts     = ["s42.app"]
      gateways  = ["app-s42"]
      http = [
        {
          name = "http-jwtks-service"
          match = [
            {
              uri = {
                prefix = "/api"
              }
              method = {
                exact = "GET"
              }
            }
          ]
          route = [
            {
              destination = {
                host = "http-jwtks-service.production.svc.cluster.local"
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
                host = "webhooked.production.svc.cluster.local"
                port = {
                  number = 8080
                }
              }
            }
          ]
        },
        {
          name = "http-api-gql"
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
                host = "http-api.production.svc.cluster.local"
                port = {
                  number = 4000
                }
              }
            }
          ]
        },
        {
          name = "http-api-gqli"
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
                host = "http-api.production.svc.cluster.local"
                port = {
                  number = 4000
                }
              }
            }
          ]
        },
        {
          name = "http-interface"
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
                host = "http-interface.production.svc.cluster.local"
                port = {
                  number = 3000
                }
              }
            }
          ]
        },
      ]
    }
    "app-s42-dashoards" = {
      namespace = "monitoring"
      hosts     = ["dashboards.s42.app"]
      gateways  = ["app-s42"]
      http = [
        {
          name = "grafana"
          route = [
            {
              destination = {
                host = "grafana.monitoring.svc.cluster.local"
                port = {
                  number = 3000
                }
              }
            }
          ]
        }
      ]
    }
  }
}
