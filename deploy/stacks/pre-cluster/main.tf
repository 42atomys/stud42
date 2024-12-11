terraform {
  required_version = ">= v1.3.3"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 4.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = ">= 2.20"
    }
    helm = {
      source  = "hashicorp/helm"
      version = ">= 2.9.0"
    }
  }

  backend "gcs" {
    bucket = "s42-terraform-state"
    prefix = "pre-cluster"
  }
}

provider "google" {
  project = "354707570699"
  region  = "europe-west1-b"
}

provider "kubernetes" {
  config_path = "~/.kube/config"
}

provider "helm" {
  kubernetes {
    config_path = "~/.kube/config"
  }
}
