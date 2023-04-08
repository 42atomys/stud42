locals {
  monitoringNamespace = "monitoring"
  grafanaRootUrl      = "dashboards.s42.app"
  grafanaVersion      = "9.2.4"
  prometheusVersion   = "v2.40.1"
  lokiVersion         = "2.7.0"
  promtailVersion     = "2.7.0"
  tempoVersion        = "1.5.0"

  nodeSelector = {
    "nodepool" = "small"
  }
}

module "monitoring_routing" {
  source = "../../modules/istio"

  virtual_services = {
    "app-s42-dashboards" = {
      namespace = local.monitoringNamespace
      gateways  = ["app-s42-dashboards"]
      hosts     = [local.grafanaRootUrl]
      http = [{
        name = "grafana"
        route = [{
          destination = {
            host = "grafana.${local.monitoringNamespace}.svc.cluster.local"
            port = {
              number = 3000
            }
          }
        }]
      }]
    }
  }
}

resource "kubernetes_cluster_role" "prometheus" {
  metadata {
    name = "prometheus"
    labels = {
      "kubernetes.io/name"           = "prometheus"
      "app.kubernetes.io/part-of"    = "prometheus"
      "app.kubernetes.io/managed-by" = "terraform"
      "app.kubernetes.io/created-by" = "github-actions"
    }
  }

  rule {
    api_groups = [""]
    resources  = ["nodes", "nodes/proxy", "services", "endpoints", "pods"]
    verbs      = ["get", "list", "watch"]
  }

  rule {
    api_groups = ["extensions"]
    resources  = ["ingresses"]
    verbs      = ["get", "list", "watch"]
  }

  rule {
    non_resource_urls = ["/metrics"]
    verbs             = ["get"]
  }

  rule {
    api_groups = ["monitoring.coreos.com"]
    resources  = ["servicemonitors"]
    verbs      = ["get", "create"]
  }
}

resource "kubernetes_service_account" "prometheus" {
  metadata {
    name      = "prometheus"
    namespace = local.monitoringNamespace
    labels = {
      "kubernetes.io/name"           = "prometheus"
      "app.kubernetes.io/part-of"    = "prometheus"
      "app.kubernetes.io/managed-by" = "terraform"
      "app.kubernetes.io/created-by" = "github-actions"
    }
  }
}

resource "kubernetes_cluster_role_binding" "prometheus" {
  depends_on = [
    kubernetes_cluster_role.prometheus,
    kubernetes_service_account.prometheus
  ]

  metadata {
    name = "prometheus"
    labels = {
      "kubernetes.io/name"           = "prometheus"
      "app.kubernetes.io/part-of"    = "prometheus"
      "app.kubernetes.io/managed-by" = "terraform"
      "app.kubernetes.io/created-by" = "github-actions"
    }
  }

  role_ref {
    api_group = "rbac.authorization.k8s.io"
    kind      = "ClusterRole"
    name      = kubernetes_cluster_role.prometheus.metadata[0].name
  }

  subject {
    kind      = "ServiceAccount"
    name      = kubernetes_service_account.prometheus.metadata[0].name
    namespace = local.monitoringNamespace
  }
}

module "prometheus" {
  source = "../../modules/service"
  kind   = "StatefulSet"

  name       = "prometheus"
  appName    = "prometheus"
  appVersion = local.prometheusVersion
  namespace  = local.monitoringNamespace
  image      = "docker.io/prom/prometheus:${local.prometheusVersion}"
  args = [
    "--storage.tsdb.path=/prometheus",
    "--config.file=/etc/prometheus/prometheus.yaml"
  ]

  nodeSelector                 = local.nodeSelector
  serviceAccountName           = "prometheus"
  automountServiceAccountToken = true

  replicas = 1

  podSecurityContext = {
    fsGroup             = 2000
    runAsGroup          = 2000
    ssupplementalGroups = [65534]
  }

  containerSecurityContext = {
    runAsGroup = 2000
    runAsUser  = 1000
  }

  prometheus = {
    enabled = true
    port    = 9090
  }

  ports = {
    prom = {
      containerPort = 9090
      istioProtocol = "http"
    }
  }

  resources = {
    limits = {
      memory = "3Gi"
    }
    requests = {
      cpu    = "300m"
      memory = "2Gi"
    }
  }

  volumeMounts = [
    {
      volumeName = "configuration"
      mountPath  = "/etc/prometheus"
    },
    {
      volumeName = "data"
      mountPath  = "/prometheus"
    }
  ]


  volumesFromConfig = {
    configuration = {
      configMapName = "prometheus-config"
    }
  }

  volumesFromPVC = {
    data = {
      claimName = "prometheus-data"
      readOnly  = false
    }
  }

  persistentVolumeClaims = {
    data = {
      accessModes      = ["ReadWriteMany"]
      storage          = "50Gi"
      storageClassName = "csi-cinder-classic"
    }
  }

  configMaps = {
    config = {
      data = {
        "prometheus.rules" = file("${path.root}/configs/monitoring/prometheus.rules")
        "prometheus.yaml"  = file("${path.root}/configs/monitoring/prometheus.yaml")
      }
      immutable = false
    }
  }
}

resource "kubernetes_role" "loki" {
  metadata {
    name      = "loki"
    namespace = local.monitoringNamespace
    labels = {
      "kubernetes.io/name"           = "loki"
      "app.kubernetes.io/part-of"    = "loki"
      "app.kubernetes.io/managed-by" = "terraform"
      "app.kubernetes.io/created-by" = "github-actions"
    }
  }

  rule {
    api_groups     = ["extensions"]
    resource_names = ["loki"]
    resources      = ["podsecuritypolicies"]
    verbs          = ["use"]
  }
}

resource "kubernetes_service_account" "loki" {
  metadata {
    name      = "loki"
    namespace = local.monitoringNamespace
    labels = {
      "kubernetes.io/name"           = "loki"
      "app.kubernetes.io/part-of"    = "loki"
      "app.kubernetes.io/managed-by" = "terraform"
      "app.kubernetes.io/created-by" = "github-actions"
    }
  }
}

resource "kubernetes_role_binding" "loki" {
  depends_on = [
    kubernetes_role.loki,
    kubernetes_service_account.loki
  ]

  metadata {
    name      = "loki"
    namespace = local.monitoringNamespace
    labels = {
      "kubernetes.io/name"           = "loki"
      "app.kubernetes.io/part-of"    = "loki"
      "app.kubernetes.io/managed-by" = "terraform"
      "app.kubernetes.io/created-by" = "github-actions"
    }
  }

  role_ref {
    api_group = "rbac.authorization.k8s.io"
    kind      = "Role"
    name      = kubernetes_role.loki.metadata[0].name
  }

  subject {
    kind      = "ServiceAccount"
    name      = kubernetes_service_account.loki.metadata[0].name
    namespace = local.monitoringNamespace
  }
}

module "loki" {
  source = "../../modules/service"
  kind   = "StatefulSet"

  name       = "loki"
  appName    = "loki"
  appVersion = local.lokiVersion
  namespace  = local.monitoringNamespace
  image      = "docker.io/grafana/loki:${local.lokiVersion}"
  args = [
    "-config.file=/etc/loki/loki.yaml"
  ]

  nodeSelector        = local.nodeSelector
  serviceAccountName  = "loki"
  replicas            = 1
  podManagementPolicy = "OrderedReady"

  podSecurityContext = {
    fsGroup    = 10001
    runAsGroup = 10001
  }

  containerSecurityContext = {
    runAsGroup = 10001
    runAsUser  = 10001
  }

  prometheus = {
    enabled = true
    port    = 3100
  }

  ports = {
    metrics = {
      containerPort = 3100
      istioProtocol = "http"
    }
    app = {
      containerPort = 9095
      istioProtocol = "grpc"
    }
    memberlist = {
      containerPort = 7946
      istioProtocol = "tcp"
    }
  }

  resources = {
    limits = {
      memory = "512Mi"
    }
    requests = {
      cpu    = "42m"
      memory = "300Mi"
    }
  }

  readinessProbe = {
    failureThreshold = 3
    httpGet = {
      path   = "/ready"
      port   = "http-metrics"
      scheme = "HTTP"
    }
    initialDelaySeconds = 45
    periodSeconds       = 10
  }

  livenessProbe = {
    failureThreshold = 3
    httpGet = {
      path   = "/ready"
      port   = "http-metrics"
      scheme = "HTTP"
    }
    initialDelaySeconds = 45
    periodSeconds       = 10
  }

  volumeMounts = [
    {
      volumeName = "configuration"
      mountPath  = "/etc/loki"
    },
    {
      volumeName = "data"
      mountPath  = "/data"
    }
  ]


  volumesFromConfig = {
    configuration = {
      configMapName = "loki-config"
    }
  }

  volumesFromPVC = {
    data = {
      claimName = "loki-data"
      readOnly  = false
    }
  }

  persistentVolumeClaims = {
    data = {
      accessModes      = ["ReadWriteMany"]
      storage          = "25Gi"
      storageClassName = "csi-cinder-classic"
    }
  }

  configMaps = {
    config = {
      data = {
        "loki.yaml" = file("${path.root}/configs/monitoring/loki.yaml")
      }
      immutable = false
    }
  }
}

resource "kubernetes_service_account" "tempo" {
  metadata {
    name      = "tempo"
    namespace = local.monitoringNamespace
    labels = {
      "kubernetes.io/name"           = "tempo"
      "app.kubernetes.io/part-of"    = "tempo"
      "app.kubernetes.io/managed-by" = "terraform"
      "app.kubernetes.io/created-by" = "github-actions"
    }
  }
}

module "tempo" {
  source = "../../modules/service"
  kind   = "StatefulSet"

  name       = "tempo"
  appName    = "tempo"
  appVersion = local.tempoVersion
  namespace  = local.monitoringNamespace
  image      = "docker.io/grafana/tempo:${local.tempoVersion}"
  args = [
    "-config.file=/etc/tempo/tempo.yaml",
    "-mem-ballast-size-mbs=1024"
  ]

  nodeSelector                 = local.nodeSelector
  serviceAccountName           = "tempo"
  automountServiceAccountToken = true
  replicas                     = 1
  podManagementPolicy          = "OrderedReady"

  prometheus = {
    enabled = true
    port    = 3100
  }

  ports = {
    metrics = {
      containerPort = 3100
      istioProtocol = "http"
    }
    "jaeger-th-c" = {
      containerPort = 6831
      istioProtocol = "udp"
      protocol      = "UDP"
    }
    "jaeger-th-b" = {
      containerPort = 6832
      istioProtocol = "udp"
      protocol      = "UDP"
    }
    "jaeger-th-h" = {
      containerPort = 14268
      istioProtocol = "tcp"
    }
    "jaeger" = {
      containerPort = 14250
      istioProtocol = "grpc"
    }
    "zipkin" = {
      containerPort = 9411
      istioProtocol = "http"
    }
    "otel-leg" = {
      containerPort = 55680
      istioProtocol = "tcp"
    }
    "otel" = {
      containerPort = 4317
      istioProtocol = "grpc"
    }
    "otel" = {
      containerPort = 55681
      istioProtocol = "http"
    }
    "opencensus" = {
      containerPort = 55678
      istioProtocol = "tcp"
    }
  }

  resources = {
    limits = {
      memory = "256Mi"
    }
    requests = {
      cpu    = "10m"
      memory = "96Mi"
    }
  }

  volumeMounts = [
    {
      volumeName = "configuration"
      mountPath  = "/etc/tempo"
    },
    {
      volumeName = "data"
      mountPath  = "/data"
    }
  ]


  volumesFromConfig = {
    configuration = {
      configMapName = "tempo-config"
    }
  }

  volumesFromPVC = {
    data = {
      claimName = "tempo-data"
      readOnly  = false
    }
  }

  persistentVolumeClaims = {
    data = {
      accessModes      = ["ReadWriteMany"]
      storage          = "10Gi"
      storageClassName = "csi-cinder-classic"
    }
  }

  configMaps = {
    config = {
      data = {
        "tempo.yaml"     = file("${path.root}/configs/monitoring/tempo.yaml")
        "overrides.yaml" = file("${path.root}/configs/monitoring/tempo-overrides.yaml")
      }
      immutable = false
    }
  }

}

resource "kubernetes_service_account" "promtail" {
  metadata {
    name      = "promtail"
    namespace = local.monitoringNamespace
    labels = {
      "kubernetes.io/name"           = "promtail"
      "app.kubernetes.io/part-of"    = "promtail"
      "app.kubernetes.io/managed-by" = "terraform"
      "app.kubernetes.io/created-by" = "github-actions"
    }
  }
}

resource "kubernetes_cluster_role" "promtail" {
  metadata {
    name = "promtail"
    labels = {
      "kubernetes.io/name"           = "promtail"
      "app.kubernetes.io/part-of"    = "promtail"
      "app.kubernetes.io/managed-by" = "terraform"
      "app.kubernetes.io/created-by" = "github-actions"
    }
  }

  rule {
    api_groups = [""]
    resources  = ["nodes", "nodes/proxy", "services", "endpoints", "pods"]
    verbs      = ["get", "watch", "list"]
  }
}

resource "kubernetes_cluster_role_binding" "promtail" {
  depends_on = [
    kubernetes_cluster_role.promtail,
    kubernetes_service_account.promtail
  ]

  metadata {
    name = "promtail"
    labels = {
      "kubernetes.io/name"           = "promtail"
      "app.kubernetes.io/part-of"    = "promtail"
      "app.kubernetes.io/managed-by" = "terraform"
      "app.kubernetes.io/created-by" = "github-actions"
    }
  }

  role_ref {
    api_group = "rbac.authorization.k8s.io"
    kind      = "ClusterRole"
    name      = kubernetes_cluster_role.promtail.metadata[0].name
  }

  subject {
    kind      = "ServiceAccount"
    name      = kubernetes_service_account.promtail.metadata[0].name
    namespace = local.monitoringNamespace
  }
}

module "promtail" {
  source = "../../modules/service"
  kind   = "DaemonSet"

  name       = "promtail"
  appName    = "promtail"
  appVersion = local.promtailVersion
  namespace  = local.monitoringNamespace
  image      = "docker.io/grafana/promtail:${local.promtailVersion}"
  args = [
    "-config.file=/etc/promtail/promtail.yaml",
  ]

  nodeSelector                 = local.nodeSelector
  serviceAccountName           = "promtail"
  automountServiceAccountToken = true

  maxUnavailable = 1

  prometheus = {
    enabled = true
    port    = 3101
  }

  ports = {
    metrics = {
      containerPort = 3101
      istioProtocol = "http"
    }
  }

  resources = {
    limits = {
      memory = "256Mi"
    }
    requests = {
      cpu    = "42m"
      memory = "128Mi"
    }
  }

  podSecurityContext = {
    fsGroup      = 0
    runAsGroup   = 0
    runAsNonRoot = false
  }


  containerSecurityContext = {
    allowPrivilegeEscalation = false
    capabilities = {
      deny_all = {
        drop = ["ALL"]
      }
    }
    runAsGroup   = 0
    runAsUser    = 0
    runAsNonRoot = false
  }

  tolerations = {
    "node-role.kubernetes.io/master" = {
      effect   = "NoSchedule"
      operator = "Exists"
    }
    "node-role.kubernetes.io/control-plane" = {
      effect   = "NoSchedule"
      operator = "Exists"
    }
  }

  envFromFieldRef = {
    "HOSTNAME" = {
      field_path = "spec.nodeName"
    }
  }

  readinessProbe = {
    failureThreshold = 5
    httpGet = {
      path = "/ready"
      port = "http-metrics"
    }
    initialDelaySeconds = 10
    periodSeconds       = 10
  }

  livenessProbe = {
    failureThreshold = 5
    httpGet = {
      path = "/ready"
      port = "http-metrics"
    }
    initialDelaySeconds = 10
    periodSeconds       = 10
  }

  volumeMounts = [
    {
      volumeName = "configuration"
      mountPath  = "/etc/promtail"
    },
    {
      volumeName = "run"
      mountPath  = "/run/promtail"
    },
    {
      volumeName = "containers"
      mountPath  = "/var/log/containers"
      readOnly   = true
    },
    {
      volumeName = "pods"
      mountPath  = "/var/log/pods"
      readOnly   = true
    }
  ]


  volumesFromConfig = {
    configuration = {
      configMapName = "promtail-config"
    }
  }

  volumesFromHostPath = {
    run = {
      hostPath = "/run/promtail"
    }
    containers = {
      hostPath = "/var/lib/docker/containers"
    }
    pods = {
      hostPath = "/var/log/pods"
    }
  }

  configMaps = {
    config = {
      data = {
        "promtail.yaml" = file("${path.root}/configs/monitoring/promtail.yaml")
      }
      immutable = false
    }
  }

}

module "grafana" {
  source = "../../modules/service"

  name       = "grafana"
  appName    = "grafana"
  appVersion = local.grafanaVersion
  namespace  = local.monitoringNamespace
  image      = "docker.io/grafana/grafana:${local.grafanaVersion}"

  nodeSelector = local.nodeSelector

  prometheus = {
    enabled = true
    port    = 3000
  }

  ports = {
    app = {
      containerPort = 3000
      istioProtocol = "http"
    }
  }

  podSecurityContext = {
    fsGroup            = 472
    runAsGroup         = 472
    runAsUser          = 472
    supplementalGroups = [0]
  }

  containerSecurityContext = {
    runAsGroup = 472
    runAsUser  = 472
  }

  env = {
    GF_SERVER_ROOT_URL         = "https://${local.grafanaRootUrl}"
    GF_AUTH_ANONYMOUS_ENABLED  = "true"
    GF_AUTH_ANONYMOUS_ORG_NAME = "S42"
  }

  resources = {
    limits = {
      memory = "768Mi"
    }
    requests = {
      cpu    = "50m"
      memory = "256Mi"
    }
  }

  readinessProbe = {
    failureThreshold = 3
    httpGet = {
      path = "/robots.txt"
      port = "http-app"
    }
    initialDelaySeconds = 10
    periodSeconds       = 30
    ttimeoutSeconds     = 2
  }

  volumeMounts = [
    {
      volumeName = "data"
      mountPath  = "/var/lib/grafana"
    }
  ]

  volumesFromPVC = {
    data = {
      claimName = "grafana-data"
      readOnly  = false
    }
  }

  persistentVolumeClaims = {
    data = {
      accessModes      = ["ReadWriteMany"]
      storage          = "1Gi"
      storageClassName = "csi-cinder-classic"
    }
  }
}
