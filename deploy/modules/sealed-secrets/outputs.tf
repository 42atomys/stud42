output "sealedSecrets" {
  depends_on = [
    kubernetes_manifest.sealed_secret
  ]

  value = {
    for k, v in local.safeSealedSecrets : k => merge(v, {
      secretName = k
    })
  }
}
