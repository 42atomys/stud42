module "crawler_campus" {
  source  = "../../../modules/service"
  enabled = var.crawlerEnabled
  kind    = "CronJob"

  name            = "crawler-campus"
  appName         = "crawler-campus"
  appVersion      = var.appVersion
  namespace       = var.namespace
  image           = "ghcr.io/42atomys/stud42:${var.appVersion}"
  imagePullPolicy = var.namespace == "previews" ? "Always" : "IfNotPresent"

  command = ["stud42cli"]
  args    = ["--config", "/config/stud42.yaml", "jobs", "crawler", "campus"]

  nodeSelector = local.nodepoolSelector["services"]

  podLabels = {
    # Disable istio sidecar injection for this pod due to the fact this is a 
    # job and we dont implement the /quitquitquit endpoint of envoy actually.
    "sidecar.istio.io/inject" = "false"
  }

  jobSchedule                   = "10 03 * * mon" # Each monday at 03:10
  jobSuccessfulJobsHistoryLimit = 1
  jobFailedJobsHistoryLimit     = 3
  jobConcurrencyPolicy          = "Forbid"
  jobTTLSecondsAfterFinished    = 300
  jobParallelism                = 1

  restartPolicy = "Never"

  resources = {
    limits = {
      memory = "128Mi"
    }
    requests = {
      cpu    = "5m"
      memory = "42Mi"
    }
  }

  env = {
    DEBUG         = "true"
    GO_ENV        = var.namespace
    DATABASE_HOST = "postgres.${var.namespace}.svc.cluster.local"
    DATABASE_NAME = "s42"
    DATABASE_URL  = "postgresql://postgres:$(DATABASE_PASSWORD)@$(DATABASE_HOST):5432/$(DATABASE_NAME)?sslmode=disable"
  }

  envFromSecret = {
    DATABASE_PASSWORD = {
      key  = "POSTGRES_PASSWORD_ENCODED"
      name = "postgres-credentials"
    }
    FORTY_TWO_ID = {
      key  = "FORTY_TWO_ID"
      name = "oauth2-providers"
    }
    FORTY_TWO_SECRET = {
      key  = "FORTY_TWO_SECRET"
      name = "oauth2-providers"
    }
    SENTRY_DSN = {
      key  = "API_DSN"
      name = "sentry-dsns"
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

module "crawler_locations" {
  source  = "../../../modules/service"
  enabled = var.crawlerEnabled
  kind    = "CronJob"

  for_each = local.campusToRefreshEachHourManually

  name            = "crawler-locations-${each.key}"
  appName         = "crawler-locations"
  appVersion      = var.appVersion
  namespace       = var.namespace
  image           = "ghcr.io/42atomys/stud42:${var.appVersion}"
  imagePullPolicy = var.namespace == "previews" ? "Always" : "IfNotPresent"

  command = ["stud42cli"]
  args    = ["--config", "/config/stud42.yaml", "jobs", "crawler", "locations", "-c", "${each.value}"]

  nodeSelector = local.nodepoolSelector["services"]

  podLabels = {
    # Disable istio sidecar injection for this pod due to the fact this is a 
    # job and we dont implement the /quitquitquit endpoint of envoy actually.
    "sidecar.istio.io/inject" = "false"
  }

  # Each hour due to webhooks is not correctly triggered on 42API
  # THIS IS USED AS WORKAROUND FOR THIS BUG.
  jobSchedule                   = "${index(keys(local.campusToRefreshEachHourManually), each.key)} * * * *"
  jobSuccessfulJobsHistoryLimit = 1
  jobFailedJobsHistoryLimit     = 3
  jobConcurrencyPolicy          = "Forbid"
  jobTTLSecondsAfterFinished    = 300
  jobParallelism                = 1

  restartPolicy = "Never"

  resources = {
    limits = {
      memory = "128Mi"
    }
    requests = {
      cpu    = "5m"
      memory = "42Mi"
    }
  }

  env = {
    DEBUG                         = "true"
    GO_ENV                        = var.namespace
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
    FORTY_TWO_ID = {
      key  = "FORTY_TWO_ID"
      name = "oauth2-providers"
    }
    FORTY_TWO_SECRET = {
      key  = "FORTY_TWO_SECRET"
      name = "oauth2-providers"
    }
    SENTRY_DSN = {
      key  = "API_DSN"
      name = "sentry-dsns"
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
