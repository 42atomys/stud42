module "api" {
  source = "../../../modules/service"

  name            = "api"
  appName         = "api"
  appVersion      = var.appVersion
  namespace       = var.namespace
  image           = "ghcr.io/42atomys/stud42:${var.appVersion}"
  imagePullPolicy = var.namespace == "previews" ? "Always" : "IfNotPresent"

  command = ["stud42cli"]
  args    = ["--config", "/config/stud42.yaml", "serve", "api", "-g"]

  nodeSelector = local.nodepoolSelector["services"]

  replicas = 1
  autoscaling = {
    enabled     = true
    minReplicas = 1
    maxReplicas = 10
    metrics = {
      cpu = {
        targetAverageUtilization = 75
      }
    }
  }

  prometheus = {
    enabled = false
  }

  resources = {
    limits = {
      memory = "96Mi"
    }
    requests = {
      cpu    = var.namespace == "production" ? "100m" : "10m"
      memory = var.namespace == "production" ? "48Mi" : "24Mi"
    }
  }

  ports = {
    api = {
      containerPort = 4000
    }
  }

  env = {
    GO_ENV                        = var.namespace
    CORS_ORIGIN                   = "https://${var.rootDomain}"
    DATABASE_HOST                 = "postgres.${var.namespace}.svc.cluster.local"
    DATABASE_NAME                 = "s42"
    DATABASE_URL                  = "postgresql://postgres:$(DATABASE_PASSWORD)@$(DATABASE_HOST):5432/$(DATABASE_NAME)?sslmode=disable"
    SEARCHENGINE_MEILISEARCH_HOST = "http://meilisearch.${var.namespace}.svc.cluster.local:7700"
  }

  envFromSecret = {
    DATABASE_PASSWORD = {
      key  = "POSTGRES_PASSWORD_ENCODED"
      name = "postgres-credentials"
    }

    GITHUB_TOKEN = {
      key  = "GITHUB_TOKEN"
      name = "github-token"
    }

    DISCORD_TOKEN = {
      key  = "DISCORD_TOKEN"
      name = "discord-token"
    }

    SENTRY_DSN = {
      key  = "API_DSN"
      name = "sentry-dsns"
    }
    S42_SERVICE_TOKEN = {
      key  = "TOKEN"
      name = "s42-service-token"
    }
    SEARCHENGINE_MEILISEARCH_TOKEN = {
      key  = "MEILI_MASTER_KEY"
      name = "meilisearch-token"
    }
  }

  volumeMounts = [
    {
      volumeName = "configuration"
      mountPath  = "/config"
      readOnly   = true
    }
  ]

  volumesFromConfig = {
    configuration = {
      configMapName = "stud42-config"
    }
  }
}
