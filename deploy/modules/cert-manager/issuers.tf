resource "kubectl_manifest" "issuers" {
  for_each = { for key, value in var.issuers : key => value if !value.is_self_signed }
  depends_on = [
    helm_release.cert_manager,
    helm_release.cert_manager_ovh
  ]

  yaml_body = yamlencode(
    {
      apiVersion = "cert-manager.io/v1"
      kind       = "ClusterIssuer"
      metadata = {
        name = each.key
      }

      spec = {
        selfSigned = each.value.is_self_signed ? {} : null
        acme = {
          email  = var.acme_email
          server = each.value.acme_server
          privateKeySecretRef = {
            name = each.value.private_key_secret_name
          }
          solvers = each.value.solvers
        }
      }
    }
  )
}

resource "kubectl_manifest" "self_signed_issuers" {
  for_each = { for key, value in var.issuers : key => value if value.is_self_signed }
  depends_on = [
    helm_release.cert_manager,
    helm_release.cert_manager_ovh
  ]

  yaml_body = yamlencode(
    {
      apiVersion = "cert-manager.io/v1"
      kind       = "ClusterIssuer"
      metadata = {
        name = each.key
      }

      spec = {
        selfSigned = each.value.is_self_signed ? {} : null
      }
    }
  )
}
