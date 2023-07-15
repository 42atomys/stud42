terraform {
  backend "s3" {
    bucket                      = "s42-terraform-state"
    key                         = "cluster.tfstate"
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
    kubectl = {
      source  = "gavinbunney/kubectl"
      version = ">= 1.11"
    }
    helm = {
      source  = "hashicorp/helm"
      version = ">= 2.9.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "3.4.3"
    }
  }
  required_version = ">= v1.3.3"
}

provider "kubernetes" {
  config_path = "~/.kube/config"
}

provider "helm" {
  kubernetes {
    config_path = "~/.kube/config"
  }
}
