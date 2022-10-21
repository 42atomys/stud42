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
  }
}


provider "kubernetes" {
  config_path = "~/.kube/config"
}

provider "kubectl" {
}

provider "helm" {
  kubernetes {
    config_path = "~/.kube/config"
  }
}
