resource "kubernetes_namespace" "namespace" {
  for_each = { for key, value in var.namespaces : key => value }

  metadata {
    name = each.key
    labels = {
      "app.kubernetes.io/name"                  = each.key
      "app.kubernetes.io/alias"                 = join(".", each.value.alias)
      "app.kubernetes.io/managed-by"            = "terraform"
      "istio-injection"                         = each.value.istioInjection ? "enabled" : "disabled"
      "pod-security.kubernetes.io/warn"         = "restricted"
      "pod-security.kubernetes.io/warn-version" = "v1.23"
    }
  }
}
