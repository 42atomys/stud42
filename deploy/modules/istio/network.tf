data "kubernetes_resource" "istio_controller" {
  api_version = "apps/v1"
  kind        = "Deployment"

  metadata {
    name      = "istiod"
    namespace = "istio-system"
  }
}

resource "kubectl_manifest" "gateways" {
  depends_on = [
    data.kubernetes_resource.istio_controller
  ]

  for_each = { for key, value in var.gateways : key => value }

  yaml_body = yamlencode(
    {
      apiVersion = "networking.istio.io/v1alpha3"
      kind       = "Gateway"
      metadata = {
        name      = each.key
        namespace = each.value.namespace
      }
      spec = {
        selector = {
          istio = each.value.ingressSelectorName
        }
        servers = concat([
          {
            hosts = each.value.hosts
            port = {
              name     = "https"
              number   = 443
              protocol = "HTTPS"
            }
            tls = {
              credentialName = each.value.tlsCredentialName
              mode           = each.value.tlsMode
            }
          },
          {
            hosts = each.value.hosts
            port = {
              name     = "http"
              number   = 80
              protocol = "HTTP"
            }
            tls = {
              httpsRedirect = each.value.serverHttpsRedirect
            }
          }
        ], each.value.extraServers)
      }
    }
  )
}

resource "kubectl_manifest" "virtual_services" {
  depends_on = [
    data.kubernetes_resource.istio_controller
  ]

  for_each = { for key, value in var.virtual_services : key => value }

  yaml_body = yamlencode(
    {
      apiVersion = "networking.istio.io/v1alpha3"
      kind       = "VirtualService"
      metadata = {
        name      = each.key
        namespace = each.value.namespace
      }
      spec = {
        gateways = each.value.gateways
        hosts    = each.value.hosts
        http     = each.value.http
      }
    }
  )
}
