resource "kubernetes_manifest" "certificate" {
  for_each = { for k, v in var.certificates : k => v }

  manifest = {
    apiVersion = "cert-manager.io/v1"
    kind       = "Certificate"
    metadata = {
      name      = each.key == "default" ? var.name : "${var.name}-${each.key}"
      namespace = var.namespace
      labels    = local.defaultLabels
    }
    spec = {
      secretName = each.key == "default" ? "${var.name}-tls" : "${var.name}-${each.key}-tls"
      issuerRef = {
        name = each.value.issuerRefName
        kind = each.value.issuerRefKind
      }
      dnsNames = each.value.dnsNames
    }
  }
}

resource "kubernetes_secret" "app" {
  for_each = { for k, v in var.secrets : k => v }

  metadata {
    name      = "${var.name}-${each.key}"
    namespace = var.namespace
    labels    = local.defaultLabels
  }

  immutable = lookup(each.value, "immutable", false)
  type      = each.value.type
  data      = each.value.data
}

resource "kubernetes_config_map" "app" {
  for_each = { for k, v in var.configMaps : k => v }

  metadata {
    name      = "${var.name}-${each.key}"
    namespace = var.namespace
    labels    = local.defaultLabels
  }

  immutable = lookup(each.value, "immutable", false)
  data      = each.value.data
}

resource "kubernetes_persistent_volume_claim" "app" {
  for_each = { for k, v in var.persistentVolumeClaims : k => v if var.enabled }

  metadata {
    name      = "${var.name}-${each.key}"
    namespace = var.namespace
    labels    = local.defaultLabels
  }

  spec {
    storage_class_name = each.value.storageClassName
    access_modes       = each.value.accessModes
    volume_name        = each.value.volumeName
    resources {
      requests = {
        storage = each.value.storage
      }
    }
  }
}

resource "kubernetes_service" "app" {
  count = length(var.ports) >= 1 && var.enabled ? 1 : 0

  metadata {
    name        = var.name
    namespace   = var.namespace
    labels      = merge(local.defaultLabels, var.deploymentLabels)
    annotations = var.deploymentAnnotations
  }

  spec {
    type = var.serviceType
    selector = {
      "kubernetes.io/name" = var.name
    }

    dynamic "port" {
      for_each = { for k, v in var.ports : k => v }
      content {
        name        = port.value.istioProtocol == "udp" ? port.key : "${port.value.istioProtocol}-${port.key}"
        port        = port.value.containerPort
        target_port = port.value.containerPort
        protocol    = lookup(port.value, "protocol", "TCP")
      }
    }
  }
}

resource "kubernetes_horizontal_pod_autoscaler_v2" "app" {
  count = var.autoscaling.enabled && var.enabled ? 1 : 0

  depends_on = [
    kubernetes_deployment.app
  ]

  metadata {
    name      = kubernetes_deployment.app[0].metadata[0].name
    namespace = kubernetes_deployment.app[0].metadata[0].namespace
    labels    = kubernetes_deployment.app[0].metadata[0].labels
  }

  spec {
    min_replicas = lookup(var.autoscaling, "minReplicas", 1)
    max_replicas = lookup(var.autoscaling, "maxReplicas", 3)

    scale_target_ref {
      api_version = "apps/v1"
      kind        = "Deployment"
      name        = kubernetes_deployment.app[0].metadata[0].name
    }

    dynamic "metric" {
      for_each = { for k, v in var.autoscaling.metrics : k => v }

      content {
        type = "Resource"
        resource {
          name = metric.key
          target {
            type                = "Utilization"
            average_utilization = lookup(metric.value, "targetAverageUtilization", 75)
          }
        }
      }
    }

    behavior {
      scale_down {
        select_policy                = "Max"
        stabilization_window_seconds = 0
        policy {
          type           = "Percent"
          period_seconds = 15
          value          = 100
        }
      }

      scale_up {
        select_policy                = "Max"
        stabilization_window_seconds = 0

        policy {
          type           = "Pods"
          period_seconds = 15
          value          = lookup(var.autoscaling, "maxReplicas", 3) + 1
        }

        policy {
          type           = "Percent"
          period_seconds = 15
          value          = 100
        }
      }
    }
  }
}
