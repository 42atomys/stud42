locals {
  meilisearchVersion = "v1.4.2"
}

resource "random_password" "meilisearch_token" {
  length  = 64
  special = true
}

module "meilisearch" {
  source = "../../../modules/service"
  kind   = "StatefulSet"

  name       = "meilisearch"
  appName    = "meilisearch"
  appVersion = local.meilisearchVersion
  namespace  = var.namespace
  image      = "getmeili/meilisearch:${local.meilisearchVersion}"

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
      memory = var.namespace == "production" ? "512Mi" : "128Mi"
    }
    requests = {
      cpu    = var.namespace == "production" ? "300m" : "10m"
      memory = var.namespace == "production" ? "352Mi" : "50Mi"
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

  volumesFromPVC = var.hasPersistentStorage ? {
    "data" = {
      claimName = "meilisearch-data"
      readOnly  = false
    }
  } : {}

  volumesFromEmptyDir = !var.hasPersistentStorage ? {
    data = {}
  } : {}

  persistentVolumeClaims = var.hasPersistentStorage ? {
    "data" = {
      accessModes      = ["ReadWriteOnce"]
      storage          = "1Gi"
      storageClassName = "csi-cinder-high-speed"
    }
  } : {}

  secrets = {
    "token" = {
      data = {
        "MEILI_MASTER_KEY" = random_password.meilisearch_token.result
      }
    }
  }
}

module "meilisearch_clean_tasks" {
  source = "../../../modules/service"
  kind   = "CronJob"

  jobSchedule                = "0 0 * * *" # Every day at the midnight
  jobTTLSecondsAfterFinished = 0
  restartPolicy              = "OnFailure"

  name       = "meilisearch-clean-tasks"
  appName    = "meilisearch-clean-tasks"
  appVersion = local.meilisearchVersion
  namespace  = var.namespace
  image      = "curlimages/curl:7.86.0"

  args = [
    "--fail",
    "-X",
    "DELETE",
    "http://meilisearch:7700/tasks?statuses=failed,canceled,succeeded",
    "-H",
    "Authorization: Bearer $(MEILI_MASTER_KEY)",
    "-H",
    "Content-Type: application/json"
  ]

  nodeSelector = local.nodepoolSelector["services"]

  envFromSecret = {
    MEILI_MASTER_KEY = {
      key  = "MEILI_MASTER_KEY"
      name = "meilisearch-token"
    }
  }
}
