terraform {
  backend "s3" {
    bucket                      = "s42-terraform-state"
    key                         = "apps.tfstate"
    endpoint                    = "https://s3.gra.io.cloud.ovh.net/"
    region                      = "gra"
    skip_region_validation      = true
    skip_credentials_validation = true
  }

  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = ">= 2.20"
    }
    helm = {
      source  = "hashicorp/helm"
      version = ">= 2.9.0"
    }
  }
}

provider "kubernetes" {
  config_path = "~/.kube/config"

  ignore_labels = [
    "security.istio.io/tlsMode",
    "service.istio.io/canonical-name",
    "service.istio.io/canonical-revision"
  ]

  ignore_annotations = [
    "sidecar.istio.io/status",
  ]
}
provider "helm" {
  kubernetes {
    config_path = "~/.kube/config"
  }
}
