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

  env = {
    RABBITMQ_DATABASE_URL = "amqp://$(RABBITMQ_USER):$(RABBITMQ_PASSWORD)@prod-primary-rabbitmq.production.svc.cluster.local:5672/"
    CONFIG_MAPS_HASH      = "${md5(file("${path.root}/configs/webhooked/webhooks.yaml"))}-${md5(file("${path.root}/configs/webhooked/template.tpl"))}"
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
