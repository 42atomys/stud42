terraform {
  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = ">= 2.14"
    }
  }
}


provider "kubernetes" {
  config_path = "~/.kube/config"
}
