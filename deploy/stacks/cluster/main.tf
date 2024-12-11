terraform {
  required_version = ">= 1.0.0"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 4.0"
    }
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

  backend "gcs" {
    bucket = "s42-terraform-state"
    prefix = "cluster"
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
