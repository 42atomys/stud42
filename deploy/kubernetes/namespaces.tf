resource "kubernetes_namespace" "namespace" {
  for_each = { for ns in local.namespaces : ns.name => ns }

  metadata {
    name = each.value.name
    labels = {
      "app.kubernetes.io/name"                  = each.value.name
      "app.kubernetes.io/alias"                 = join(".", each.value.alias)
      "app.kubernetes.io/managed-by"            = "terraform"
      "istio-injection"                         = each.value.istioInjection ? "enabled" : "disabled"
      "pod-security.kubernetes.io/warn"         = "restricted"
      "pod-security.kubernetes.io/warn-version" = "v1.23"
    }
  }
}
