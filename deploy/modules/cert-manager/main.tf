terraform {
  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = ">= 2.14"
    }
    kubectl = {
      source  = "gavinbunney/kubectl"
      version = ">= 1.7.0"
    }
    helm = {
      source  = "hashicorp/helm"
      version = ">= 2.7.1"
    }
    null = {
      source  = "hashicorp/null"
      version = ">= 3.1.0"
    }
  }
}


provider "kubernetes" {
  config_path = "~/.kube/config"
}

provider "helm" {
  kubernetes {
    config_path = "~/.kube/config"
  }
}

resource "helm_release" "cert_manager" {
  name             = "cert-manager"
  repository       = "https://charts.jetstack.io"
  chart            = "cert-manager"
  version          = "v1.10.0"
  create_namespace = false
  namespace        = "cert-manager"
  max_history      = 3

  set {
    name  = "installCRDs"
    value = true
  }

  set {
    name  = "prometheus.enabled"
    value = true
  }

  set {
    name  = "nodeSelector.kubernetes\\.io/os"
    value = "linux"
  }

  set {
    name  = "podAnnotations.prometheus\\.io/scrape"
    value = "true"
  }

  set {
    name  = "podAnnotations.prometheus\\.io/port"
    value = "9402"
  }

  set {
    name  = "global.leaderElection.namespace"
    value = "cert-manager"
  }
}


resource "null_resource" "cert_manager_ovh_source" {
  provisioner "local-exec" {
    working_dir = "/tmp"
    command     = "rm -rf '/tmp/cert-manager-webhook-ovh' '/tmp/baarde-cert-manager-webhook-ovh-*' && curl -L0 https://github.com/baarde/cert-manager-webhook-ovh/tarball/master | tar -xz && mv /tmp/baarde-cert-manager-webhook-ovh-?* /tmp/cert-manager-webhook-ovh"
  }
}

resource "kubernetes_role" "cert_manager_webhook_ovh_secret_reader" {
  depends_on = [
    helm_release.cert_manager
  ]
  metadata {
    name      = "cert-manager-webhook-ovh:secret-reader"
    namespace = helm_release.cert_manager.namespace
  }

  rule {
    api_groups     = [""]
    resources      = ["secrets"]
    resource_names = ["ovh-credentials"]
    verbs          = ["get", "watch"]
  }
}

resource "kubernetes_role_binding" "cert_manager_webhook_ovh_secret_reader" {
  depends_on = [
    kubernetes_role.cert_manager_webhook_ovh_secret_reader
  ]

  metadata {
    name      = kubernetes_role.cert_manager_webhook_ovh_secret_reader.metadata[0].name
    namespace = helm_release.cert_manager.namespace
  }

  role_ref {
    api_group = "rbac.authorization.k8s.io"
    kind      = "Role"
    name      = kubernetes_role.cert_manager_webhook_ovh_secret_reader.metadata[0].name
  }

  subject {
    api_group = ""
    kind      = "ServiceAccount"
    name      = "cert-manager-webhook-ovh"
    namespace = helm_release.cert_manager.namespace
  }
}

resource "helm_release" "cert_manager_ovh" {
  depends_on = [
    helm_release.cert_manager,
    null_resource.cert_manager_ovh_source,
    resource.kubernetes_role_binding.cert_manager_webhook_ovh_secret_reader
  ]

  name             = "cert-manager-webhook-ovh"
  namespace        = helm_release.cert_manager.namespace
  create_namespace = false
  chart            = "/tmp/cert-manager-webhook-ovh/deploy/cert-manager-webhook-ovh"

  set {
    name  = "groupName"
    value = "acme.s42.app"
  }
}
