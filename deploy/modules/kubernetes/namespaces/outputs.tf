output "namespace" {
  description = "The namespace created"
  depends_on = [
    kubernetes_namespace.namespace
  ]

  value = {
    for key, value in var.namespaces : key => key
  }
}
