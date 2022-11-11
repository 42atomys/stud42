module "crawler_campus" {
  source  = "../../../modules/service"
  enabled = var.crawlerEnabled
  kind    = "CronJob"

  name       = "crawler-campus"
  appName    = "crawler-campus"
  appVersion = var.appVersion
  namespace  = var.namespace
  image      = "ghcr.io/42atomys/stud42:${var.appVersion}"

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
    # TODO(@42atomys) : Remove this when release
    FORTY_TWO_CLIENT_ID = {
      key  = "FORTY_TWO_ID"
      name = "oauth2-providers"
    }
    # TODO(@42atomys) : Remove this when release
    FORTY_TWO_CLIENT_SECRET = {
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

  name       = "crawler-locations"
  appName    = "crawler-locations"
  appVersion = var.appVersion
  namespace  = var.namespace
  image      = "ghcr.io/42atomys/stud42:${var.appVersion}"

  command = ["stud42cli"]
  args    = ["--config", "/config/stud42.yaml", "jobs", "crawler", "locations"]

  podLabels = {
    # Disable istio sidecar injection for this pod due to the fact this is a 
    # job and we dont implement the /quitquitquit endpoint of envoy actually.
    "sidecar.istio.io/inject" = "false"
  }

  # Each two minute due to webhooks is not correctly triggered on 42API
  # THIS IS USED AS WORKAROUND FOR THIS BUG.
  jobSchedule                   = "*/2 * * * *"
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
    # TODO(@42atomys) : Remove this when release
    FORTY_TWO_CLIENT_ID = {
      key  = "FORTY_TWO_ID"
      name = "oauth2-providers"
    }
    # TODO(@42atomys) : Remove this when release
    FORTY_TWO_CLIENT_SECRET = {
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
