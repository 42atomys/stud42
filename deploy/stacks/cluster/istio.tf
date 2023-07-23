module "istio" {
  source = "../../modules/istio"

  gateways = {
    "app-s42" = {
      ingressSelectorName = "ingressgateway"
      namespace           = "production"
      serverHttpsRedirect = true
      hosts               = ["s42.app"]
      tlsMode             = "SIMPLE"
      tlsCredentialName   = "app-s42-tls"
    },
    "app-s42-next" = {
      ingressSelectorName = "ingressgateway"
      namespace           = "staging"
      serverHttpsRedirect = true
      hosts               = ["next.s42.app"]
      tlsMode             = "SIMPLE"
      tlsCredentialName   = "app-s42-next-tls"
    },
    "dev-s42-previews" = {
      ingressSelectorName = "ingressgateway"
      namespace           = "previews"
      serverHttpsRedirect = true
      hosts               = ["*.previews.s42.dev"]
      tlsMode             = "SIMPLE"
      tlsCredentialName   = "dev-s42-previews-tls"
    },
    "app-s42-dashboards" = {
      ingressSelectorName = "ingressgateway"
      namespace           = local.monitoringNamespace
      serverHttpsRedirect = true
      hosts               = ["dashboards.s42.app"]
      tlsMode             = "SIMPLE"
      tlsCredentialName   = "app-s42-dashboards-tls"
    },
  }
}
