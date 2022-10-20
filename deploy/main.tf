terraform {
  backend "s3" {
    bucket                      = "s42-terraform-state"
    key                         = "terraform.tfstate"
    endpoint                    = "https://s3.gra.io.cloud.ovh.net/"
    region                      = "gra"
    skip_region_validation      = true
    skip_credentials_validation = true
  }

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

module "kubernetes" {
  source = "./kubernetes"
}
