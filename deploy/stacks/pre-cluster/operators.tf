resource "helm_release" "istio_base" {
  name             = "istio-base"
  repository       = "https://istio-release.storage.googleapis.com/charts"
  chart            = "base"
  version          = "v1.15.2"
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

resource "helm_release" "rabbitmq_operator" {
  repository = "https://charts.bitnami.com/bitnami"
  chart      = "rabbitmq-cluster-operator"
  version    = "3.1.1"

  create_namespace = true
  name             = "primary"
  namespace        = "rabbitmq-operator"
}

resource "helm_release" "sealed_secret" {
  repository = "https://bitnami-labs.github.io/sealed-secrets"
  chart      = "sealed-secrets"
  version    = "2.7.0"

  create_namespace = false
  name             = "sealed-secret"
  namespace        = "kube-system"

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
    value = "100m"
  }

  set {
    name  = "resources.requests.memory"
    value = "128Mi"
  }

  set {
    name  = "resources.limits.memory"
    value = "256Mi"
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
}
