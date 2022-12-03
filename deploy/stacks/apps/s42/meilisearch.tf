resource "random_password" "meilisearch_token" {
  length  = 64
  special = true
}

module "meilisearch" {
  source = "../../../modules/service"

  name       = "meilisearch"
  appName    = "meilisearch"
  appVersion = "v0.30"
  namespace  = var.namespace
  image      = "getmeili/meilisearch:v0.30"

  nodeSelector = local.nodepoolSelector["services"]

  replicas = 1
  autoscaling = {
    enabled = false
  }

  prometheus = {
    enabled = false
  }

  resources = {
    limits = {
      memory = "256Mi"
    }
    requests = {
      cpu    = "100m"
      memory = "128Mi"
    }
  }

  ports = {
    app = {
      containerPort = 7700
    }
  }

  env = {
    MEILI_ENV = "production"
  }

  envFromSecret = {
    MEILI_MASTER_KEY = {
      key  = "MEILI_MASTER_KEY"
      name = "meilisearch-token"
    }
  }

  volumeMounts = [
    {
      volumeName = "data"
      mountPath  = "/meili_data"
    }
  ]

  volumesFromPVC = {
    "data" = {
      claimName = "data"
      readOnly  = false
    }
  }

  persistentVolumeClaims = {
    "data" = {
      accessModes      = ["ReadWriteOnce"]
      storage          = "1Gi"
      storageClassName = "csi-cinder-high-speed"
    }
  }

  secrets = {
    "token" = {
      data = {
        "MEILI_MASTER_KEY" = random_password.meilisearch_token.result
      }
    }
  }
}
