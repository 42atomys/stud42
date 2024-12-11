terraform {
  required_version = ">= 1.0.0"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 4.0"
    }
  }
  backend "gcs" {
    bucket = "s42-terraform-state"
    prefix = "infrastructure"
  }
}

provider "google" {
  project = "354707570699"
  region  = "europe-west1-b"
}
