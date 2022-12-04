resource "random_password" "next_auth_secret" {
  length  = 128
  special = false
}

resource "kubernetes_secret" "next_auth_secret" {
  metadata {
    name      = "next-auth-secret"
    namespace = var.namespace
  }

  depends_on = [
    random_password.next_auth_secret,
  ]

  data = {
    NEXTAUTH_SECRET = random_password.next_auth_secret.result
  }
}

module "interface" {
  source = "../../../modules/service"

  name            = "interface"
  appName         = "interface"
  appVersion      = var.appVersion
  namespace       = var.namespace
  image           = "ghcr.io/42atomys/stud42:${var.appVersion}"
  imagePullPolicy = var.namespace == "previews" ? "Always" : "IfNotPresent"

  args = ["server.js"]

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
      memory = "1Gi"
    }
    requests = {
      cpu    = "500m"
      memory = "512Mi"
    }
  }

  ports = {
    interface = {
      containerPort = 3000
    }
  }

  env = {
    DEBUG                   = "true"
    NODE_ENV                = var.namespace
    NEXT_PUBLIC_GRAPHQL_API = "https://${var.rootDomain}/graphql"
    NEXTAUTH_URL            = "https://${var.rootDomain}"
    CONFIG_PATH             = "/config/stud42.yaml"
  }
  envFromSecret = {
    FORTY_TWO_ID = {
      key  = "FORTY_TWO_ID"
      name = "oauth2-providers"
    }

    FORTY_TWO_SECRET = {
      key  = "FORTY_TWO_SECRET"
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
      name = "next-auth-secret"
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
  }

  volumesFromSecret = {
    certs-grpc = {
      secretName = "jwtks-service-grpc-internal-tls"
    }
  }
}
