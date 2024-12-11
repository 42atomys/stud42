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
    helm = {
      source  = "hashicorp/helm"
      version = ">= 2.9.0"
    }
  }

  backend "gcs" {
    bucket = "s42-terraform-state"
    prefix = "apps"
  }
}

provider "google" {
  project = "354707570699"
  region  = "europe-west1-b"
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
