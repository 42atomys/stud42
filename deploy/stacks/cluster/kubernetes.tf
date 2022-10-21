module "kubernetes_namespaces" {
  source = "../../modules/kubernetes/namespaces"

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
    "rabbitmq-system" = {
      alias : []
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
