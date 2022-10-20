locals {
  namespaces = [
    {
      name : "cert-manager"
      alias : []
      istioInjection : false
    },
    {
      name : "istio-system"
      alias : []
      istioInjection : false
    },
    {
      name : "monitoring"
      alias : []
      istioInjection : true
    },
    {
      name : "permission-manager"
      alias : []
      istioInjection : false
    },
    {
      name : "production"
      alias : ["live"]
      istioInjection : true
    },
    {
      name : "rabbitmq-system"
      alias : []
      istioInjection : true
    },
    {
      name : "review-apps"
      alias : ["reviews", "pull-requests"]
      istioInjection : true
    },
    {
      name : "sandbox"
      alias : ["dev"]
      istioInjection : true
    },
    {
      name : "staging"
      alias : ["next"]
      istioInjection : true
    }
  ]
}
