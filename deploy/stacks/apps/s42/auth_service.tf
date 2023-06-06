
module "auth_service" {
  source = "../../../modules/service"

  name            = "auth-service"
  appName         = "auth-service"
  appVersion      = var.appVersion
  namespace       = var.namespace
  image           = "ghcr.io/42atomys/stud42:${var.appVersion}"
  imagePullPolicy = var.namespace == "previews" ? "Always" : "IfNotPresent"

  command = ["stud42cli"]
  args    = ["--config", "/config/stud42.yaml", "serve", "auth"]

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

  podSecurityContext = {
    fsGroup = 1001
  }

  containerSecurityContext = {
    runAsGroup   = 1001
    runAsNonRoot = true
    runAsUser    = 1001
  }

  resources = {
    limits = {
      memory = "40Mi"
    }
    requests = {
      cpu    = var.namespace == "production" ? "60m" : "10m"
      memory = "20Mi"
    }
  }

  ports = {
    signing = {
      containerPort = 5000
      istioProtocol = "tls"
    }

    wellknow = {
      containerPort = 5000
      istioProtocol = "http"
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
    certs-jwk = {
      # secret defined in the secrets.tf file, not on the app module
      # TODO: move it to the app module (add sealedSecret to the app module)
      secretName = "auth-service-certs-jwk"
    }
  }
}
