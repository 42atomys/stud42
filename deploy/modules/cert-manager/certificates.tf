resource "kubectl_manifest" "certificates" {
  for_each = { for key, value in var.certificates : key => value }
  depends_on = [
    helm_release.cert_manager
  ]

  yaml_body = yamlencode({
    apiVersion = "cert-manager.io/v1"
    kind       = "Certificate"
    metadata = {
      name      = each.key
      namespace = coalesce(each.value.namespace, "istio-system")
    }

    spec = {
      dnsNames    = each.value.dns_names
      duration    = coalesce(each.value.duration, "2160h")    # 90d
      renewBefore = coalesce(each.value.renew_before, "360h") # 15d
      issuerRef = {
        kind = coalesce(each.value.issuer_kind, "ClusterIssuer")
        name = each.value.issuer_name
      }
      secretName = coalesce(each.value.secret_name, "${each.key}-tls")
    }
  })
}
