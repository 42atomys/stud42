module "api" {
  source = "../../../modules/service"

  name            = "api"
  appName         = "api"
  appVersion      = var.appVersion
  namespace       = var.namespace
  image           = "ghcr.io/42atomys/stud42:${var.appVersion}"
  imagePullPolicy = var.namespace == "s42-previews" ? "Always" : "IfNotPresent"

  command = ["stud42cli"]
  args    = ["--config", "/config/stud42.yaml", "serve", "api", "-g"]

  nodeSelector = local.nodepoolSelector["services"]

  replicas = 2
  autoscaling = {
    enabled     = true
    minReplicas = 2
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
      cpu    = "100m"
      memory = "48Mi"
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
    KEYVALUE_STORE_HOST           = "dragonfly.${var.namespace}.svc.cluster.local"
    KEYVALUE_STORE_PORT           = "6379"
    KEYVALUE_STORE_URL            = "redis://:$(DFLY_PASSWORD)@$(KEYVALUE_STORE_HOST):$(KEYVALUE_STORE_PORT)"
    SEARCHENGINE_MEILISEARCH_HOST = "http://meilisearch.${var.namespace}.svc.cluster.local:7700"
  }

  envFromSecret = {
    DATABASE_PASSWORD = {
      key  = "POSTGRES_PASSWORD_ENCODED"
      name = "postgres-credentials"
    }

    DFLY_PASSWORD = {
      key  = "DFLY_PASSWORD_ENCODED"
      name = "dragonfly-credentials"
    }

    FORTY_TWO_ID = {
      key  = "FORTY_TWO_ID"
      name = "oauth2-providers"
    }

    FORTY_TWO_SECRET = {
      key  = "FORTY_TWO_SECRET"
      name = "oauth2-providers"
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

    AWS_ACCESS_KEY_ID = {
      key  = "AWS_ACCESS_KEY_ID"
      name = "s3-credentials"
    }

    AWS_SECRET_ACCESS_KEY = {
      key  = "AWS_SECRET_ACCESS_KEY"
      name = "s3-credentials"
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
