resource "helm_release" "rabbitmq_operator" {
  repository = "https://charts.bitnami.com/bitnami"
  chart      = "bitnami/rabbitmq-cluster-operator"

  create_namespace = true
  namespace        = "rabbitmq-operator"
}

resource "kubernetes_manifest" "rabbitmq" {
  depends_on = [
    helm_release.rabbitmq_operator,
    kubernetes_namespace.namespace
  ]

  manifest = {
    apiVersion = "rabbitmq.com/v1beta1"
    kind       = "RabbitmqCluster"
    metadata = {
      name      = "rabbitmq"
      namespace = "rabbitmq-system"
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
      persistence = {
        storageClassName = "csi-cinder-high-speed"
        storage          = "5Gi"
      }
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
    namespace = "rabbitmq-system"
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


module "postgres" {
  source = "../../modules/services/app"

  depends_on = [
    random_password.postgres
  ]

  appName         = "postgres"
  appVersion      = "14.1-alpine3.14"
  name            = "postgres"
  namespace       = "production"
  image           = "ghcr.io/42atomys/s42-postgres:14.2-alpine3.15"
  imagePullPolicy = "IfNotPresent"

  revisionHistoryLimit = 1
  replicas             = 1
  maxUnavailable       = 0

  resources = {
    requests = {
      cpu    = "250m"
      memory = "200Mi"
    }
  }

  env = {
    PGDATA = "/var/lib/postgresql/data/pgdata"
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

  volumesFromPVC = {
    data = {
      claimName = "postgres-data"
      readOnly  = false
    }
  }

  volumesFromConfig = {
    init-scripts = {
      configMapName = "postgres-config"
    }
  }

  configMaps = {
    postgres-config = {
      data = {
        "init-database.sh" = file("${path.root}/configs/postgres/init-database.sh")
      }
      immutable = false
    }
  }

  secrets = {
    postgres-credentials = {
      data = {
        "POSTGRES_PASSWORD" = random_password.postgres.result
      }
      immutable = false
    }
  }

  persistentVolumeClaims = {
    postgres-data = {
      accessModes      = ["ReadWriteOnce"]
      storage          = "10Gi"
      storageClassName = "csi-cinder-high-speed"
    }
  }
}
