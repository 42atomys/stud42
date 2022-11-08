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
