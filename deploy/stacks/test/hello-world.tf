resource "kubernetes_pod" "preview" {
  metadata {
    name      = local.deployment_name
    namespace = "previews"
    labels = {
      "app" = local.deployment_name
    }
  }

  spec {
    container {
      name              = "nginx"
      image             = "nginx:1.21.3"
      image_pull_policy = "IfNotPresent"
      port {
        container_port = 80
        name           = "http"
      }
      readiness_probe {
        http_get {
          path = "/"
          port = 80
        }
        initial_delay_seconds = 5
        period_seconds        = 5
        timeout_seconds       = 5
        success_threshold     = 1
        failure_threshold     = 3
      }
    }
  }
}

resource "kubernetes_service" "preview" {
  depends_on = [
    kubernetes_pod.preview
  ]

  metadata {
    name      = local.deployment_name
    namespace = "previews"
  }

  spec {
    selector = kubernetes_pod.preview.metadata.0.labels
    port {
      name = kubernetes_pod.preview.spec.0.container.0.port.0.name
      port = kubernetes_pod.preview.spec.0.container.0.port.0.container_port
    }
  }
}

resource "kubectl_manifest" "virtual_services_preview" {
  depends_on = [
    kubernetes_service.preview
  ]

  yaml_body = yamlencode(
    {
      apiVersion = "networking.istio.io/v1alpha3"
      kind       = "VirtualService"
      metadata = {
        name      = local.deployment_name
        namespace = "previews"
      }
      spec = {
        gateways = ["dev-s42-previews"]
        hosts    = ["${local.deployment_name}.previews.s42.dev"]
        http = [
          {
            name = local.deployment_name
            route = [
              {
                destination = {
                  host = "${local.deployment_name}.previews.svc.cluster.local"
                  port = {
                    number = 80
                  }
                }
              }
            ]
          }
        ]
      }
    }
  )
}
