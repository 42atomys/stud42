module "istio" {
  source = "../../modules/istio"

  gateways = {
    "app-s42" = {
      ingressSelectorName = "ingressgateway"
      namespace           = "s42-production"
      serverHttpsRedirect = true
      hosts               = ["s42.app"]
      tlsMode             = "SIMPLE"
      tlsCredentialName   = "app-s42-tls"
    },
    "app-s42-staging" = {
      ingressSelectorName = "ingressgateway"
      namespace           = "s42-staging"
      serverHttpsRedirect = true
      hosts               = ["next.s42.app"]
      tlsMode             = "SIMPLE"
      tlsCredentialName   = "app-s42-staging-tls"
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
