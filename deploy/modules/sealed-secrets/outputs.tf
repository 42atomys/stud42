output "sealedSecrets" {
  depends_on = [
    kubernetes_manifest.sealed_secret
  ]

  value = {
    for k, v in var.sealedSecrets : k => merge(v, {
      secretName = k
    })
  }
}
