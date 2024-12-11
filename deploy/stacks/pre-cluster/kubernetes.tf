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
    "s42-monitoring" = {
      alias : []
      istioInjection : true
    },
    "s42-production" = {
      alias : ["live"]
      istioInjection : true
    },
    "s42-previews" = {
      alias : ["reviews", "review-apps", "pull-requests"]
      istioInjection : true
    },
    "s42-sandbox" = {
      alias : ["dev"]
      istioInjection : true
    },
    "s42-staging" = {
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
