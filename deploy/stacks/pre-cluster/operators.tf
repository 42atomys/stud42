resource "helm_release" "istio_base" {
  name             = "istio-base"
  repository       = "https://istio-release.storage.googleapis.com/charts"
  chart            = "base"
  version          = "v1.24.1"
  create_namespace = false
  max_history      = 3
  namespace        = "istio-system"
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

  set {
    name  = "pilot.nodeSelector.cloud\\.google\\.com/gke-nodepool"
    value = "pool-high-workers"
  }

  set {
    name  = "service.ports[0].name"
    value = "status-port"
  }

  set {
    name  = "service.ports[0].port"
    value = "15021"
  }

  set {
    name  = "service.ports[1].name"
    value = "http2"
  }

  set {
    name  = "service.ports[1].port"
    value = "80"
  }

  set {
    name  = "service.ports[2].name"
    value = "https"
  }

  set {
    name  = "service.ports[2].port"
    value = "443"
  }

  set {
    name  = "service.ports[3].name"
    value = "grpc"
  }

  set {
    name  = "service.ports[3].port"
    value = "51000"
  }

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
    name  = "pilot.nodeSelector.cloud\\.google\\.com/gke-nodepool"
    value = "pool-high-workers"
  }
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
    value = "50m"
  }

  set {
    name  = "components.pilot.k8s.resources.requests.memory"
    value = "256Mi"
  }

  set {
    name  = "components.pilot.k8s.resources.limits.cpu"
    value = "200m"
  }

  set {
    name  = "components.pilot.k8s.resources.limits.memory"
    value = "512Mi"
  }

  set {
    name  = "meshConfig.defaultConfig.gatewayTopology.numTrustedProxies"
    value = "2"
  }
}

resource "helm_release" "rabbitmq_operator" {
  repository = "https://charts.bitnami.com/bitnami"
  chart      = "rabbitmq-cluster-operator"
  version    = "3.1.2"

  create_namespace = true
  name             = "primary"
  namespace        = "rabbitmq-operator"

  set {
    name  = "nodeSelector.cloud\\.google\\.com/gke-nodepool"
    value = "pool-high-workers"
  }
}

resource "helm_release" "sealed_secret" {
  repository = "https://bitnami-labs.github.io/sealed-secrets"
  chart      = "sealed-secrets"
  version    = "2.7.0"

  create_namespace = false
  name             = "sealed-secret"
  namespace        = "kube-system"

  set {
    name  = "nodeSelector.cloud\\.google\\.com/gke-nodepool"
    value = "pool-high-workers"
  }

  set {
    name  = "fullnameOverride"
    value = "sealed-secrets-controller"
  }

  set {
    name  = "nodeSelector.kubernetes\\.io/os"
    value = "linux"
  }

  set {
    name  = "resources.requests.cpu"
    value = "10m"
  }

  set {
    name  = "resources.requests.memory"
    value = "24Mi"
  }

  set {
    name  = "resources.limits.memory"
    value = "48Mi"
  }

  set {
    name  = "podSecurityContext.fsGroup"
    value = "1001"
  }

  set {
    name  = "containerSecurityContext.runAsUser"
    value = "1001"
  }

  set {
    name  = "podAnnotations.prometheus\\.io/scrape"
    value = "\"true\""
  }

  set {
    name  = "podAnnotations.prometheus\\.io/port"
    value = "\"8080\""
  }
}

resource "helm_release" "reflector" {
  repository = "https://emberstack.github.io/helm-charts"
  chart      = "reflector"
  version    = "6.1.47"

  create_namespace = false
  name             = "reflector"
  namespace        = "kube-system"

  set {
    name  = "nodeSelector.cloud\\.google\\.com/gke-nodepool"
    value = "pool-high-workers"
  }

  set {
    name  = "resources.requests.cpu"
    value = "10m"
  }

  set {
    name  = "resources.requests.memory"
    value = "128Mi"
  }

  set {
    name  = "resources.limits.memory"
    value = "256Mi"
  }
}
