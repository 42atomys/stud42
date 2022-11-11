data "kubernetes_resource" "sealed_secret_controller" {
  api_version = "apps/v1"
  kind        = "Deployment"

  metadata {
    name      = var.sealedSecretsControllerName
    namespace = var.sealedSecretsControllerNamespace
  }

  object = {}
}


resource "kubernetes_manifest" "sealed_secret" {
  for_each = { for k, secret in var.sealedSecrets : k => secret if var.enabled }

  depends_on = [
    data.kubernetes_resource.sealed_secret_controller
  ]

  lifecycle {
    precondition {
      condition     = data.kubernetes_resource.sealed_secret_controller != null
      error_message = "Sealed Secrets controller is not available"
    }
  }

  manifest = {
    apiVersion = "bitnami.com/v1alpha1"
    kind       = "SealedSecret"
    metadata = {
      name      = each.key
      namespace = each.value.namespace
      annotations = {
        "sealedsecrets.bitnami.com/cluster-wide"   = each.value.isClusterWide ? "true" : "false"
        "sealedsecrets.bitnami.com/namespace-wide" = each.value.isClusterWide ? "false" : "true"
      }
    }
    spec = {
      template = {
        metadata = {
          name      = each.key
          namespace = each.value.namespace
          annotations = {
            "sealedsecrets.bitnami.com/cluster-wide"   = each.value.isClusterWide ? "true" : "false"
            "sealedsecrets.bitnami.com/namespace-wide" = each.value.isClusterWide ? "false" : "true"
            "reflector.v1.k8s.emberstack.com/reflection-allowed" : each.value.reflected ? "true" : "false"
            "reflector.v1.k8s.emberstack.com/reflection-auto-enabled" : each.value.reflected ? "true" : "false"
            "reflector.v1.k8s.emberstack.com/reflection-allowed-namespaces" : join(",", each.value.reflectedNamespaces)
            "reflector.v1.k8s.emberstack.com/reflection-auto-namespaces" : join(",", each.value.reflectedNamespaces)
          }
        }
        type = each.value.secretType
      }
      encryptedData = each.value.encryptedData
    }
  }
}
