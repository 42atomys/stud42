resource "helm_release" "rabbitmq_operator" {
  repository = "https://charts.bitnami.com/bitnami"
  chart      = "rabbitmq-cluster-operator"
  version    = "3.1.1"

  create_namespace = true
  name             = "primary"
  namespace        = "rabbitmq-operator"
}
