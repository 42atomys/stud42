module "webhooks_processor" {
  source  = "../../../modules/service"
  enabled = var.webhookProcessorEnabled

  name            = "webhooks-processor"
  appName         = "webhooks-processor"
  appVersion      = var.appVersion
  namespace       = var.namespace
  image           = "ghcr.io/42atomys/stud42:${var.appVersion}"
  imagePullPolicy = var.namespace == "previews" ? "Always" : "IfNotPresent"

  command = ["stud42cli"]
  args    = ["--config", "/config/stud42.yaml", "jobs", "webhooks"]

  nodeSelector = local.nodepoolSelector["services"]

  podLabels = {
    # Disable istio sidecar injection for this pod as it is not needed
    "sidecar.istio.io/inject" = "false"
  }

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
      memory = "60Mi"
    }
    requests = {
      cpu    = "20m"
      memory = "30Mi"
    }
  }

  env = {
    # Enable the DEBUG mode for the webhooks processor to get more logs 
    # from the application itself
    # TODO : Remove this once the application is stable enough
    DEBUG                         = "true"
    GO_ENV                        = var.namespace
    DATABASE_HOST                 = "postgres.${var.namespace}.svc.cluster.local"
    DATABASE_NAME                 = "s42"
    DATABASE_URL                  = "postgresql://postgres:$(DATABASE_PASSWORD)@$(DATABASE_HOST):5432/$(DATABASE_NAME)?sslmode=disable"
    AMQP_URL                      = "amqp://$(RABBITMQ_USER):$(RABBITMQ_PASSWORD)@$(RABBITMQ_HOST).cluster.local:$(RABBITMQ_PORT)/"
    SEARCHENGINE_MEILISEARCH_HOST = "http://meilisearch.${var.namespace}.svc.cluster.local:7700"
  }
  envFromSecret = {
    # S42_SERVICE_TOKEN = {
    #   key  = "TOKEN"
    #   name = "s42-service-token"
    # }
    RABBITMQ_HOST = {
      key  = "host"
      name = "rabbitmq-default-user"
    }
    RABBITMQ_PORT = {
      key  = "port"
      name = "rabbitmq-default-user"
    }
    RABBITMQ_USER = {
      key  = "username"
      name = "rabbitmq-default-user"
    }

    RABBITMQ_PASSWORD = {
      key  = "password"
      name = "rabbitmq-default-user"
    }
    FORTY_TWO_ID = {
      key  = "FORTY_TWO_ID"
      name = "oauth2-providers"
    }
    FORTY_TWO_SECRET = {
      key  = "FORTY_TWO_SECRET"
      name = "oauth2-providers"
    }
    DATABASE_PASSWORD = {
      key  = "POSTGRES_PASSWORD_ENCODED"
      name = "postgres-credentials"
    }

    SENTRY_DSN = {
      key  = "WEBHOOKS_PROCESSOR_DSN"
      name = "sentry-dsns"
    }
    SEARCHENGINE_MEILISEARCH_TOKEN = {
      key  = "MEILI_MASTER_KEY"
      name = "meilisearch-token"
    }
  }

  envFromFieldRef = {
    POD_IP = {
      field_path = "status.podIP"
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
