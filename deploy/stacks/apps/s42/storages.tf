data "kubernetes_resource" "rabbitmq_operator" {
  api_version = "apps/v1"
  kind        = "Deployment"
  metadata {
    name      = "primary-rabbitmq-cluster-operator"
    namespace = "rabbitmq-operator"
  }

  object = {}
}

resource "kubernetes_manifest" "rabbitmq" {
  depends_on = [
    data.kubernetes_resource.rabbitmq_operator,
  ]

  field_manager {
    force_conflicts = true
  }

  manifest = {
    apiVersion = "rabbitmq.com/v1beta1"
    kind       = "RabbitmqCluster"
    metadata = {
      name      = "rabbitmq"
      namespace = var.namespace
    }


    spec = {
      replicas = 1
      # Custom image available at build/packages/rabbitmq used to enable the custom 
      # plugins on rabbitmq (rabbitmq_delayed_message_exchange)
      image = "ghcr.io/42atomys/s42-rabbitmq:3.10.2-management"
      imagePullSecrets = [
        {
          name = "ghcr-creds"
        }
      ]

      persistence = var.hasPersistentStorage ? {
        storageClassName = "csi-cinder-high-speed"
        storage          = var.namespace == "production" ? "5Gi" : "1Gi"
      } : null

      rabbitmq = {
        additionalPlugins = [
          "rabbitmq_delayed_message_exchange"
        ]
      }
    }
  }
}

resource "kubernetes_pod_disruption_budget" "rabbitmq" {
  depends_on = [
    kubernetes_manifest.rabbitmq
  ]

  metadata {
    name      = "rabbitmq"
    namespace = var.namespace
  }

  spec {
    max_unavailable = 0
    selector {
      match_labels = {
        "app.kubernetes.io/name" = "rabbitmq"
      }
    }
  }
}

###############################
## Postgres database
###############################
resource "random_password" "postgres" {
  length  = 64
  special = true
}

# resource "helm_release" "postgresql" {
#   repository = "https://charts.bitnami.com/bitnami"
#   chart      = "postgresql"
#   version    = "10.0.1"

#   create_namespace = false
#   name             = "postgres"
#   namespace        = var.namespace

#   set {
#     name  = "image.registry"
#     value = "ghcr.io/42atomys"
#   }

#   set {
#     name  = "image.repository"
#     value = "s42-postgres"
#   }

#   set {
#     name  = "image.tag"
#     value = "13.4.0"
#   }

#   set {
#     name  = "image.pullSecrets"
#     value = ["ghcr-creds"]
#   }

#   set {
#     name  = "postgresqlDataDir"
#     value = "/var/lib/postgresql/data/pgdata"
#   }

#   set {
#     name  = "auth.postgresPassword"
#     value = random_password.postgres.result
#   }

#   set {
#     name  = "volumePermissions.enabled"
#     value = ""
#   }

#   set {
#     name  = "primary.persistence.enabled"
#     value = true
#   }

#   set {
#     name  = "primary.persistence.storageClass"
#     value = "csi-cinder-high-speed"
#   }

#   set {
#     name  = "primary.persistence.size"
#     value = var.namespace == "production" ? "10Gi" : "1Gi"
#   }

#   set {
#     name  = "primary.persistence.accessModes"
#     value = ["ReadWriteOnce"]
#   }

#   set {
#     name  = "primary.persistence.mountPath"
#     value = "/var/lib/postgresql/data/pgdata"
#   }

#   set {
#     name  = "primary.initdb.scriptsConfigMap"
#     value = ""
#   }
# }

module "postgres" {
  source = "../../../modules/service"
  kind   = "StatefulSet"

  appName         = "postgres"
  appVersion      = "14.1"
  name            = "postgres"
  namespace       = var.namespace
  image           = "ghcr.io/42atomys/s42-postgres:14.2-alpine3.15"
  imagePullPolicy = "IfNotPresent"

  revisionHistoryLimit = 1
  replicas             = 1
  maxUnavailable       = 0

  podSecurityContext = {
    fsGroup      = 70
    runAsGroup   = 70
    runAsNonRoot = true
  }

  containerSecurityContext = {
    runAsGroup   = 70
    runAsNonRoot = true
    runAsUser    = 70
  }

  resources = {
    requests = {
      cpu    = "250m"
      memory = "200Mi"
    }
    limits = {
      memory = "1Gi"
    }
  }

  env = {
    PGDATA      = "/var/lib/postgresql/data/pgdata"
    POSTGRES_DB = "s42"
  }

  envFromSecret = {
    POSTGRES_PASSWORD = {
      key  = "POSTGRES_PASSWORD"
      name = "postgres-credentials"
    }
  }

  ports = {
    postgres = {
      containerPort = 5432
      istioProtocol = "tcp"
    }
  }

  volumeMounts = [
    {
      mountPath  = "/var/lib/postgresql/data"
      volumeName = "data"
    },
    {
      mountPath  = "/docker-entrypoint-initdb.d"
      volumeName = "init-scripts"
      readOnly   = true
    }
  ]

  volumesFromPVC = var.hasPersistentStorage ? {
    data = {
      claimName = "postgres-data"
      readOnly  = false
    }
  } : {}

  volumesFromEmptyDir = !var.hasPersistentStorage ? {
    data = {}
  } : {}

  volumesFromConfig = {
    init-scripts = {
      configMapName = "postgres-config"
    }
  }

  configMaps = {
    config = {
      data = {
        "init-database.sh" = file("${path.root}/configs/postgres/init-database.sh")
      }
      immutable = false
    }
  }

  secrets = {
    credentials = {
      data = {
        "POSTGRES_PASSWORD"         = random_password.postgres.result
        "POSTGRES_PASSWORD_ENCODED" = urlencode(random_password.postgres.result)
      }
      immutable = false
    }
  }

  persistentVolumeClaims = var.hasPersistentStorage ? {
    data = {
      accessModes      = ["ReadWriteOnce"]
      storage          = var.namespace == "production" ? "10Gi" : "1Gi"
      storageClassName = "csi-cinder-high-speed"
    }
  } : {}
}
