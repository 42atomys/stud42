module "webhooked" {
  source = "../../modules/services/app"

  name       = "webhooked"
  appName    = "webhooked"
  appVersion = var.appsVersion.webhooked
  namespace  = var.namespace
  image      = "atomys/webhooked:${var.appsVersion.webhooked}"

  replicas = 1
  autoscaling = {
    enabled     = true
    minReplicas = 1
    maxReplicas = 3
    metrics = {
      cpu = {
        targetAverageUtilization = 75
      }
    }
  }

  prometheus = {
    enabled = true
    port    = 8080
  }

  resources = {
    limits = {
      memory = "25Mi"
    }
    requests = {
      cpu    = "20m"
      memory = "15Mi"
    }
  }

  ports = {
    http = {
      containerPort = 8080
      protocol      = "TCP"
    }
  }

  livenessProbe = {
    httpGet = {
      path = "/metrics"
      port = "8080"
    }
  }

  readinessProbe = {
    httpGet = {
      path = "/metrics"
      port = "8080"
    }
  }

  env = {
    RABBITMQ_DATABASE_URL = "amqp://$(RABBITMQ_USER):$(RABBITMQ_PASSWORD)@prod-primary-rabbitmq.production.svc.cluster.local:5672/"
    CONFIG_MAPS_HASH      = "${md5(file("${path.root}/configs/webhooked/webhooks.yaml"))}-${md5(file("${path.root}/configs/webhooked/template.tpl"))}"
  }

  envFromSecret = {
    RABBITMQ_USER = {
      key  = "username"
      name = "prod-primary-rabbitmq-default-user"
    }

    RABBITMQ_PASSWORD = {
      key  = "password"
      name = "prod-primary-rabbitmq-default-user"
    }

    WEBHOOK_SECRET_HEADER = {
      key  = "WEBHOOK_SECRET_HEADER"
      name = "s42-webhooked-secrets"
    }

    GITHUB_WEBHOOK_SECRET = {
      key  = "GITHUB_WEBHOOK_SECRET"
      name = "s42-webhooked-secrets"
    }
  }

  volumeMounts = [
    {
      volumeName = "configuration"
      mountPath  = "/config/webhooks.yaml"
      readOnly   = true
      subPath    = "webhooks.yaml"
      }, {
      volumeName = "configuration"
      mountPath  = "/config/template.tpl"
      readOnly   = true
      subPath    = "template.tpl"
    }
  ]

  volumesFromConfig = {
    configuration = {
      configMapName = "webhooked-config"
    }
  }

  configMaps = {
    "config" = {
      data = {
        "template.tpl"  = file("${path.root}/configs/webhooked/template.tpl")
        "webhooks.yaml" = file("${path.root}/configs/webhooked/webhooks.yaml")
      }
      immutable = false
    }
  }
}

module "webhooks_processor" {
  source = "../../modules/services/app"

  depends_on = [
    kubernetes_config_map.stud42_config
  ]

  name       = "webhooks-processor"
  appName    = "webhooks-processor"
  appVersion = var.appsVersion.stud42
  namespace  = var.namespace
  image      = "ghcr.io/42atomys/stud42:${var.appsVersion.stud42}"

  command = ["stud42cli"]
  args    = ["--config", "/config/stud42.yaml", "jobs", "webhooks"]

  podAnnotations = {
    # Disable istio sidecar injection for this pod as it is not needed
    "sidecar.istio.io/inject" = "false"
  }

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
      memory = "25Mi"
    }
    requests = {
      cpu    = "20m"
      memory = "15Mi"
    }
  }

  env = {
    # Enable the DEBUG mode for the webhooks processor to get more logs 
    # from the application itself
    # TODO : Remove this once the application is stable enough
    DEBUG             = "true"
    GO_ENV            = var.namespace
    DATABASE_HOST     = "prod-primary-postgres.production.svc.cluster.local"
    DATABASE_USERNAME = "postgres"
    DATABASE_NAME     = "s42"
    DATABASE_URL      = "postgresql://$(DATABASE_USERNAME):$(DATABASE_PASSWORD)@$(DATABASE_HOST):5432/$(DATABASE_NAME)?sslmode=disable"
    AMQP_URL          = "amqp://$(AMQP_USERNAME):$(AMQP_PASSWORD)@$(AMQP_HOST):$(AMQP_PORT)"
  }
  envFromSecret = {
    AMQP_USERNAME = {
      key  = "username"
      name = "prod-primary-rabbitmq-default-user"
    }
    AMQP_PASSWORD = {
      key  = "password"
      name = "prod-primary-rabbitmq-default-user"
    }
    AMQP_HOST = {
      key  = "host"
      name = "prod-primary-rabbitmq-default-user"
    }
    AMQP_PORT = {
      key  = "port"
      name = "prod-primary-rabbitmq-default-user"
    }
    FORTY_TWO_CLIENT_ID = {
      key  = "FORTY_TWO_CLIENT_ID"
      name = "oauth2-providers"
    }
    FORTY_TWO_CLIENT_SECRET = {
      key  = "FORTY_TWO_CLIENT_SECRET"
      name = "oauth2-providers"
    }
    DATABASE_PASSWORD = {
      key  = "POSTGRES_PASSWORD"
      name = "primary-postgres-credentials"
    }

    SENTRY_DSN = {
      key  = "WEBHOOKS_PROCESSOR_DSN"
      name = "sentry-dsns"
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

module "jwtks_service" {
  source = "../../modules/services/app"

  depends_on = [
    kubernetes_config_map.stud42_config
  ]

  name       = "jwtks-service"
  appName    = "jwtks-service"
  appVersion = var.appsVersion.stud42
  namespace  = var.namespace
  image      = "ghcr.io/42atomys/stud42:${var.appsVersion.stud42}"

  command = ["stud42cli"]
  args    = ["--config", "/config/stud42.yaml", "serve", "jwtks"]

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
      memory = "60Mi"
    }
    requests = {
      cpu    = "100m"
      memory = "40Mi"
    }
  }

  ports = {
    grpc = {
      containerPort = 5000
    }

    http = {
      containerPort = 5500
    }
  }

  env = {
    GO_ENV = var.namespace
  }
  envFromSecret = {
    SENTRY_DSN = {
      key  = "JWTKS_SERVICE_DSN"
      name = "sentry-dsns"
    }
    S42_SERVICE_TOKEN = {
      key  = "TOKEN"
      name = "s42-service-token"
    }
  }

  volumeMounts = [
    {
      volumeName = "configuration"
      mountPath  = "/config"
      readOnly   = true
    },
    {
      volumeName = "certs-grpc"
      mountPath  = "/etc/certs/grpc"
      readOnly   = true
    },
    {
      volumeName = "certs-jwk"
      mountPath  = "/etc/certs/jwk"
      readOnly   = true
    }
  ]

  volumesFromConfig = {
    configuration = {
      configMapName = "stud42-config"
    }
  }

  volumesFromSecret = {
    certs-grpc = {
      secretName = "jwtks-service-grpc-internal-tls"
    }
    certs-jwk = {
      secretName = "jwtks-service-certs-jwk"
    }
  }

  certificates = {
    grpc-internal = {
      dnsNames      = ["jwtks-service"]
      issuerRefKind = "ClusterIssuer"
      issuerRefName = "selfsigned-issuer"
    }
  }

  dynamic "secrets" {
    for_each = var.jwtksSecretNeedsToBeCreated ? [1] : []
    content {
      certs-jwk = {
        data = {
          "private.key" = filebase64("${path.root}/../certs/private.key")
          "public.pem"  = filebase64("${path.root}/../certs/public.pem")
        }
      }
    }
  }
}

module "api" {
  source = "../../modules/services/app"

  depends_on = [
    kubernetes_config_map.stud42_config
  ]

  name       = "api"
  appName    = "api"
  appVersion = var.appsVersion.stud42
  namespace  = var.namespace
  image      = "ghcr.io/42atomys/stud42:${var.appsVersion.stud42}"

  command = ["stud42cli"]
  args    = ["--config", "/config/stud42.yaml", "serve", "api", "-g"]

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
      memory = "60Mi"
    }
    requests = {
      cpu    = "100m"
      memory = "40Mi"
    }
  }

  ports = {
    http = {
      containerPort = 4000
    }
  }

  env = {
    GO_ENV            = var.namespace
    CORS_ORIGIN       = "http://localhost:3000"
    DATABASE_HOST     = "primary-postgres"
    DATABASE_USERNAME = "postgres"
    DATABASE_NAME     = "s42"
    DATABASE_URL      = "postgresql://$(DATABASE_USERNAME):$(DATABASE_PASSWORD)@$(DATABASE_HOST):5432/$(DATABASE_NAME)?sslmode=disable"
    CONFIG_MAP_UID    = kubernetes_config_map.stud42_config.uid
  }
  envFromSecret = {
    DATABASE_PASSWORD = {
      key  = "POSTGRES_PASSWORD"
      name = "primary-postgres-credentials"
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

module "interface" {
  source = "../../modules/services/app"

  depends_on = [
    kubernetes_config_map.stud42_config
  ]

  name       = "interface"
  appName    = "interface"
  appVersion = var.appsVersion.stud42
  namespace  = var.namespace
  image      = "ghcr.io/42atomys/stud42:${var.appsVersion.stud42}"

  args = ["server.js"]


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
      memory = "1Gi"
    }
    requests = {
      cpu    = "500m"
      memory = "512Mi"
    }
  }

  ports = {
    http = {
      containerPort = 3000
    }
  }

  env = {
    NODE_ENV                = var.namespace
    NEXT_PUBLIC_GRAPHQL_API = "${var.baseUrl}/graphql"
    NEXTAUTH_URL            = "${var.baseUrl}"
    CONFIG_PATH             = "/config/stud42.yaml"
    CONFIG_MAP_UID          = kubernetes_config_map.stud42_config.uid
  }
  envFromSecret = {
    FORTY_TWO_CLIENT_ID = {
      key  = "FORTY_TWO_CLIENT_ID"
      name = "oauth2-providers"
    }

    FORTY_TWO_CLIENT_SECRET = {
      key  = "FORTY_TWO_CLIENT_SECRET"
      name = "oauth2-providers"
    }

    GITHUB_ID = {
      key  = "GITHUB_ID"
      name = "oauth2-providers"
    }

    GITHUB_SECRET = {
      key  = "GITHUB_SECRET"
      name = "oauth2-providers"
    }

    DISCORD_ID = {
      key  = "DISCORD_ID"
      name = "oauth2-providers"
    }

    DISCORD_SECRET = {
      key  = "DISCORD_SECRET"
      name = "oauth2-providers"
    }

    NEXTAUTH_SECRET = {
      key  = "NEXTAUTH_SECRET"
      name = "interface-nextauth-secret"
    }

    NEXT_PUBLIC_SENTRY_DSN = {
      key  = "INTERFACE_DSN"
      name = "sentry-dsns"
    }
    S42_SERVICE_TOKEN = {
      key  = "TOKEN"
      name = "s42-service-token"
    }
  }

  volumeMounts = [
    {
      volumeName = "configuration"
      mountPath  = "/config"
      readOnly   = true
    },
    {
      volumeName = "certs-grpc"
      mountPath  = "/etc/certs/grpc"
      readOnly   = true
    }
  ]

  volumesFromConfig = {
    configuration = {
      configMapName = "stud42-config"
    }
    certs-grpc = {
      secretName = "jwtks-service-grpc-internal-tls"
    }
  }
}
