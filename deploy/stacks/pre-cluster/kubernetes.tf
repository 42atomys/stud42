locals {
  namespaces = {
    "cert-manager" = {
      alias : []
      istioInjection : false
    },
    "istio-system" = {
      alias : []
      istioInjection : true
    },
    "monitoring" = {
      alias : []
      istioInjection : true
    },
    "permission-manager" = {
      alias : []
      istioInjection : false
    },
    "production" = {
      alias : ["live"]
      istioInjection : true
    },
    "previews" = {
      alias : ["reviews", "review-apps", "pull-requests"]
      istioInjection : true
    },
    "sandbox" = {
      alias : ["dev"]
      istioInjection : true
    },
    "staging" = {
      alias : ["next"]
      istioInjection : true
    }
  }
}

resource "kubernetes_namespace" "namespace" {
  for_each = { for key, value in local.namespaces : key => value }

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
