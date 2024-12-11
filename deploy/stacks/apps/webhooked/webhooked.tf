module "secrets" {
  source  = "../../../modules/sealed-secrets"
  enabled = var.enabled

  sealedSecrets = {
    "s42-webhooked-secrets" : {
      isClusterWide = false
      namespace     = var.namespace

      encryptedData = {
        "GITHUB_WEBHOOK_SECRET" = "AgAwlQkuadWkRxAOfQQod8NWN7kp8HxNwfCrULjYIAvVtxjvd3ccTjCI94kvV+Q81b8K3vCjQVpTRYuXVaks5ighbCgUi5+Jlw86xkeCGQIdWe07AexgS4+Ky/Pj8H2zqf7AQVtUgDpkwyWlJAhmTyJeRt4K2IuezlOZg8CluP08XIqJ3e0MaYYAo/rdi1q9+76SnHeY1jpKRiNY/I88QXXr6b1R9imnfJULZqilJ3IkKfGZ3SSfCegZ2ezOMmO+EDSdq4qX40iGsVDBbld6TsaPK5QWczIpfRyZ+J9XdvAdJ58OpWdXRkxsyuK+O7vomolQSG+UlN4VGvSdJUYI2XuKQ27wPv/yKoZJtejteDCET+YEbU+Q/6r2SJuhcZQ7ckC+Hg6KYHOFPvbsZB7Y0DgxuH6K9A8993fz/uWkxKSQMmT12/ysbp4fYiK9gmXNtM/DBVV6aTfvcyo1O/ALeNqUjP7LawZ6sDOrji7misxcIXYQYftkD9scApT38G08X+2hPHu6ULJZYW2SUMD60c7NQUEWInv40ERoPcnqh/xDibgn41Nkv1/gAW9itqOwQK/VKlJV4xLPfReve6wwuOcbV5m5IRBk8ObgQCj0chKmdHjtcrOH7aVnAzjCQIAj9fK51onEeZfrlN1YDefJRI1eBkEakAkf2OWoo1UTlqEzMTS0HFwZ9Dm1E/ADCO4faDmVYl34KsXLQ4Htd5Nr6wYsLPxcHEz+poJJhUFS0SGG8NnZM4sM032Za4Is2I2d1wFyXqq6lQAUHQ==",
        "WEBHOOK_SECRET_HEADER" = "AgAMXbQWnnVeiiYxpxt1+KDCSwk6hk+0gmXFG55iJ1G8g9b6/nvP4NqEvKvE07Yrx8DqBkX0kyBbSIz6DTpkdJGp2tJDohZ0w4c+wzJjS7ETuADTjQlrNZyRL8HeAQ7bYl8UfwJH8LUDZNifO9WyPjRZ4UdX/ZMWz2lqhcs74Cvl136LTBzH8zDv4ZrLI4nQAiETQaAWBOHmkdQpJnqt2Sg19J5Pyhd5IhvLi9AigDkk+rkU4WCNDOl2CPpxY3U8bZY3atHRJeZ7+3bg8oyG5h30HaUNdji6Bru9KiEHoyaYJKl1lR8I0vmnCBkw76qRc/wxhaaBEfImSjTOK3wYLkpIP8AjSD5f13nPzqk5gm1T6UZGpDy09zvMpHrjPkIyfX1cP3JUHsZYTvKZGpIMDyRcdZwWBuM+xd0IV1Pw2f84GaeogM0vnDJ4kp43IL0a9N/lAr6R9qemtw5Thbrx+EeJdto7YcWsa3QHLc3ovfMnQ0pUZqcBPZ3Q2T2ipA3ATjfNNCwS74BWyd3ift4eT3MOUVd3zQJeVO0rXCROjo1c18NrBHeoRBHMr7ejnhfi7ItRUs+LHEOgfv6k37zdqPjHBt6pq2P7W3D0/Xvjgxqi5oawwbE4y1tE6XHrBiloYdA4I0sMaO5hEbj7xO2NVPqE/U62wkmPYUv8BOxoYeD8PI8MjRTFEtsdSSakXyAaGd8Wi5LJBLRDbRYNR8+DV6Cti9E/tPluusQeA+5okGxgc6hQwsnCcuNfYHQpxJcUfImR5dCCtxqBpAQ7Bwm8c8wkIv/k4C09ULyzYwAwResZHrCjkeJZ5lKl/O0XVb2BYVimsaLtU+VJay8rr+5XCpUg5Twx4f5JR6tSxzT2sdNZrjGBm77KpQgkY0yG3w84LcKcQMXsPjRh2Loa5hUsqnYHlMDOw+4B7HOhxVsUCvPILjNaKGOhMvaR5qGsnKV1c7l0J1AuRLlIHlSerLIq1tdcRK2a4KI6/bnedXFbczGUH60TQfdmCyTw8dC0e2PsCB8Q0cOS/UyqMQhLPkrjaTbmKugmHgK3Tg=="
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
      }, {
      volumeName = "configuration"
      mountPath  = "/config/github_template.tpl"
      readOnly   = true
      subPath    = "github_template.tpl"
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
        "template.tpl"        = file("${path.root}/configs/webhooked/template.tpl")
        "github_template.tpl" = file("${path.root}/configs/webhooked/github_template.tpl")
        "webhooks.yaml"       = file("${path.root}/configs/webhooked/webhooks.yaml")
      }
      immutable = false
    }
  }
}
