module "secrets" {
  source  = "../../../modules/sealed-secrets"
  enabled = var.enabled

  sealedSecrets = {
    "s42-webhooked-secrets" : {
      isClusterWide = false
      namespace     = var.namespace

      encryptedData = {
        GITHUB_WEBHOOK_SECRET = "AgAlVdqq8lH5K32i8MkN04M/rG1YkgDU0zcDGgJjHd/o8OfuYhCNRbUvi/xN5jbSL39k5tJVWMuGW0SV+nvM5KyGAProoHkLL1ltnV9lcvSxhfxY5N8TbKLZmn9iWIpMayucYPUHUi2zyv+D8D9IR2GzgtbZLa/f0OKqLwkebxnd4rCMwOVwn6ZV1SFUnwOnYMSs8X8vISWK8YD2qmE+lo/CNbixoW9qw1t4PbqMiV6ZJsbA+xr5niqAEgEhFLEsZC0VHmvRJulfkJg99+OTKzUcSJ1saMdCi95pyU54pnAOvHbApxfZigxrXC1UE+MoxShnuIzRErcsvo5+FUPZkubKshBha+OwAKjCF3jUsdmkG30V0cWswVSoxejTf5WVOw75C7Kas+HddJaq4JLqT8KZyWKNvkiDTTvOO5QL7jm26a0zGvJ6sR/4py3TdcrF7XCdGv3ysRRdcQ2Kk0e2z2Gn3ZA/67m9RDLU1CyGxEZcU7LTEYQQyGI+GkWQNjqka//AdM+i1J5f68hSIzrrKna/GGOlRCYVmfwVypDOKIc8x5bZf087+36cvqMuiVqPaoyRBhA0jjHOEiq9gI7S0QRhTA1fbT5ddQdnYW+zcXvcMzQ4H2XGPszXzmUh6hD4g4UAcweWEjKRulebG1IIgYbiZ9tJGwmwUEObWX1QZ4r9BxZCzwE/x+o/pNe6K2Mi+i+uOfBq6sEzGlULo4uFvrGrtP/0ZBTLP+hAvTXl1ETMGxnA/fYJokrkyrDkh4Udy64Bgge3004wHA=="
        WEBHOOK_SECRET_HEADER = "AgBhsG3UFpoUs6wiZy8NE0cyMVygX99hQ57VSp3nkCBHWfQJFZQv1NnkpBjLzNcT9Br1w4kcr9S5vYc/19jDsDnonpACxLgY2q6LTEJ+bdl+EhUg0Tb9+/VFTmHbTbEAWWtIhBqc/sMUOOyJ7/G2pqP0MPEQ9bvFtt0+2V98Wq1Vyj2uMVbQYT6QvXwiBMmKN3jtKL8mcr0LSb6PK2poV+EWQQIbPpEUOinq7igPS7RbgPoGfapaf9TsRSEOT29j9k8YiXiqO5CYDz67UTSdP7kq6TENV+cHb06K4eGbFWdJFTLRBN5A0p4XXm9t3GDC1bSufy6Y1shxwVLJkLiKY1NF9rxD9jOCnn3QmT78DUGBFC2JJekm+wvN/s0scSQ81G3tlZW26ftxb6CyChTze+ovpBAP7L+oZXuwVYasQS0kqPPQvSvn5T5f3wP3asQOxqq3SOnWUm9vXURxSeRQBVSSIzqqpnRvrY48L6mvc2n3nLJAc0Mom+YRY9IDOOxtpejc6sdd+9U8BAEKPCG6uFxXwYxle9kBUIiEB9mQgn0pAssOF/vXngP1R7XCPrRauaCQ2IKbdXCYfny1csc9ajUHVJrOszww1VjYzTuEVzWhW9kMTjZEgHARG0/S/FusgJfHRY6zT+smfvhFUzigh1o4s1AtC1lKYjX90CkbbACkBhlt/7n/yai4OKw+Mj01rx+1n2MZml7HIcbj67BybXS3SXHXq9LW7oRnyXnnVLq9N2c46wTFeCuV/WADeyPVO7vsRmkxn+4dbqwED1AjRkXTuDvAi0paLQbyII7H0ghyHAARY25GW+TUGXNE1+GBU5CUlbWA1d97BEdoW5bGOTzeO2E+Ktqt2/y4hmCe+uhqaBIIRr50HhieKIhDu/MlwypRbHDxno6VAgvh7wtIGsCLqHEEJQ=="
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
