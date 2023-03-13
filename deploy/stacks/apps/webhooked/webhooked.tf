module "secrets" {
  source  = "../../../modules/sealed-secrets"
  enabled = var.enabled

  sealedSecrets = {
    "s42-webhooked-secrets" : {
      isClusterWide = false
      namespace     = var.namespace

      encryptedData = {
        "GITHUB_WEBHOOK_SECRET" = "AgBR/xT5WFSNIUYWI/ed3HQP3DaHc7kFED+HvELXOTUaEs2h2nmy5fJCFLk5RbDhNHpXB3jGCzEg6CEal2bjDpHAhNzrfNYP78P10SKixzAam8Ne26aFOgvR1okkLdvmqjiFyFajJW76ArZHF+vaeOrm17ZrLw3qkxPNUAM6mAH6NOD4N2vlS7zyPqY8rPM1U8ko+wgzDtYTQXHpshY4eWI/RAMyZT8hSTElMRoy8cNIdrNkXQKMCU77hOkQIWCwqX1gVXgLesJjmMEnfopcXT1gdP5GU+3b0drAwTja/j6KoMfKxxmlFFyn8B05rE9nHvZHYznPM+/wXbhjCOwA+z8wDsvfetQz9fY+FK635kCPVrwIzf+gEz7FKfsLYKdDVeV2RcB/L8chNz1AQRDQLw753rFFXnJKJc++jORjI8rC3sF//Zc5QjFbsMKv5kysYOhqObRGTidYmuVY5KEu3eWuSxaFZ6q4RiOStJp7pCSfUxX/X8OJs1rE0kCpFrXgI2icBl3YvEW9RlIRDhfxtpvNQfU1vVx0G160h5AwA5dOa5+rHgKhjU2HlaqwgAAeyrVctvqqp+mfVTG6C19nOVZBRRu//xINTp6MoZ8Fd+/fTN5IL3+r5OvhGRHSj546YQSW+Iv5XHbV0Uqv/QctrGwMGqkjbdz2dk/shfTCjBRd8SrOwjxnvcuGaaQsdMLsb3FmbGBX6SgGRaw+Jlw1stLvGmXOOHOY+Zul8yngz8hyGabnYvkvhQvfGL+LRheTM3lzHfR/EyOH9Q==",
        "WEBHOOK_SECRET_HEADER" = "AgCV5tq4sISxnhu4gTB0V+hO06iOIXWY/93COj+V+F2rKjyUb8j6ktbsVibbGJ+KvHTo02UWJ5Qv9NtlZ7zFKm0HCrKKTORixKK3QTAJdk6pxIUYfHdGsDozcDU9ozF/2Xy3DuHEad20m1G1UCb9ICtkar07Q64jH/1P5L+xhA0RwdwW/zOQe5IxHV/2daf0oi4xJIaM0kLvhpe/PFIqViTm9fExpo5AlA5XqjrSNspoNfH6maX5OO9ShawyzKXEFMFLWJdtbV8JMh6nu/h3uVFKzWiH5rK3GbqVzNozZdjGzqA3iqPNZ5U7pBP5DX0qW65zuGLV28ZUWmZTTBpWed22FLn6+VLu3FDw7GSaXCIen0R3zr6WZ99SmBY/yBNJDphtJgrIWLX9W+VDGms9LOemXXToao4AxqBzdHCDu1kH+zV8BjFW8rKHCGsKcZhU3LxVVvf5Q0xUf6jhTqekVz1c58/ifmO/4QVm1uifPL3PBbdMYo1BzU8FZpieoPerzbw1TQR5yElTQY9Miphiht2vJhTXpIdIvvK3ByTaW6aZ1wACx6WSHj7hJrB5pLz6S2f7XeB0VwPeAtThwpovXRfrTr17sRmGGQ+M+LjHQbC3dZpq/JQWiNrZ8ufvBvJhyV1qUjf5ZTDQrsU0POdFqdwIkdtSbPOHdG2XaE0ODGNKy1TZb4aW73EX/LlXhzqpjA9/0mTyMMjJVkPkNij8by0Gr0VUVsv47+NtNHTV01VYNTAo/sO5JbYI3KBVw2K0kNemNHyKIwBn2lfzcCspeECUHL7/7jmt7o0Qg4WoKdRHFbzgEi0jW1Q9TPbkOMWPZj1gF2qTH5WK2NAeNDWtSvQBJyaoWkmsS7fpkzxs54OuYfUxtOdoyjadpLJDaar5WMkLWGGIf7XCY9zdSsRhIO0F90pRaOsfFelo6TRck9IhszQY20w6wj6T/YYTsslxJ8MJuhjmRyfEPSuJud6BtyYwyiFTV6kbwtxuBQbD09ocEPYhWOBEA74Hrki9X7g3hBaKT6m2wVKoa4fv0jXThp1sbYVq2xXKpA=="
      }
    }
  }
}

module "webhooked" {
  source  = "../../../modules/service"
  enabled = var.enabled

  name       = "webhooked"
  appName    = "webhooked"
  appVersion = var.appVersion
  namespace  = var.namespace
  image      = "atomys/webhooked:${var.appVersion}"

  nodeSelector = local.nodepoolSelector

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
      memory = "50Mi"
    }
    requests = {
      cpu    = "10m"
      memory = "25Mi"
    }
  }

  ports = {
    app = {
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
    RABBITMQ_DATABASE_URL = "amqp://$(RABBITMQ_USER):$(RABBITMQ_PASSWORD)@$(RABBITMQ_HOST).cluster.local:$(RABBITMQ_PORT)/"
    CONFIG_MAPS_HASH      = "${md5(file("${path.root}/configs/webhooked/webhooks.yaml"))}-${md5(file("${path.root}/configs/webhooked/template.tpl"))}"
  }

  envFromSecret = {
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

    WEBHOOK_SECRET_HEADER = {
      key  = "WEBHOOK_SECRET_HEADER"
      name = module.secrets.sealedSecrets["s42-webhooked-secrets"].secretName
    }

    GITHUB_WEBHOOK_SECRET = {
      key  = "GITHUB_WEBHOOK_SECRET"
      name = module.secrets.sealedSecrets["s42-webhooked-secrets"].secretName
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
