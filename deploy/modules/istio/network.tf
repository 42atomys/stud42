
resource "helm_release" "istio_base" {
  name             = "istio-base"
  repository       = "https://istio-release.storage.googleapis.com/charts"
  chart            = "base"
  version          = "v1.15.2"
  create_namespace = false
  max_history      = 3
  namespace        = "istio-system"
}


resource "helm_release" "istiod" {
  depends_on = [
    helm_release.istio_base
  ]
  name             = "istiod"
  chart            = "istiod"
  create_namespace = helm_release.istio_base.create_namespace
  repository       = helm_release.istio_base.repository
  version          = helm_release.istio_base.version
  max_history      = helm_release.istio_base.max_history
  namespace        = helm_release.istio_base.namespace

  set {
    name  = "components.pilot.k8s.strategy.rollingUpdate.maxUnavailable"
    value = "0"
  }

  set {
    name  = "components.pilot.k8s.strategy.rollingUpdate.maxSurge"
    value = "1"
  }

  set {
    name  = "components.pilot.k8s.resources.requests.cpu"
    value = "500m"
  }

  set {
    name  = "components.pilot.k8s.resources.requests.memory"
    value = "1Gi"
  }

  set {
    name  = "components.pilot.k8s.resources.limits.cpu"
    value = "500m"
  }

  set {
    name  = "components.pilot.k8s.resources.limits.memory"
    value = "2Gi"
  }

  set {
    name  = "meshConfig.defaultConfig.gatewayTopology.numTrustedProxies"
    value = "2"
  }
}

resource "helm_release" "gateway" {
  depends_on = [
    helm_release.istio_base
  ]
  name             = "istio-ingressgateway"
  chart            = "gateway"
  create_namespace = helm_release.istio_base.create_namespace
  repository       = helm_release.istio_base.repository
  version          = helm_release.istio_base.version
  max_history      = helm_release.istio_base.max_history
  namespace        = helm_release.istio_base.namespace
}

resource "kubectl_manifest" "gateways" {
  depends_on = [
    helm_release.gateway
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
        ], tolist(each.value.extraServers))
      }
    }
  )
}

resource "kubectl_manifest" "virtual_services" {
  depends_on = [
    kubectl_manifest.gateways
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
