locals {
  // This is a workarround to avoid the following error:
  // Error: Invalid for_each argument 
  // Error: mismatch true and false types when we use `{}` as default value for
  // `sealedSecrets` variable
  safeSealedSecrets = var.sealedSecrets == null ? {} : var.sealedSecrets
}

resource "kubernetes_manifest" "sealed_secret" {
  for_each = { for k, secret in local.safeSealedSecrets : k => secret if var.enabled }

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

      # Acknowledging the warning for x-kubernetes-preserve-unknown-field
      encryptedData = each.value.encryptedData
    }
  }
}
