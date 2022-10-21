resource "kubernetes_pod" "helloworld" {
  metadata {
    name      = "helloworld"
    namespace = "previews"
    labels = {
      "app" = "helloworld"
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

resource "kubernetes_service" "helloworld" {
  depends_on = [
    kubernetes_pod.helloworld
  ]

  metadata {
    name      = "helloworld"
    namespace = "previews"
  }

  spec {
    selector = kubernetes_pod.helloworld.metadata.0.labels
    port {
      name = kubernetes_pod.helloworld.spec.0.container.0.port.0.name
      port = kubernetes_pod.helloworld.spec.0.container.0.port.0.container_port
    }
  }
}

resource "kubectl_manifest" "virtual_services_helloworld" {
  depends_on = [
    kubernetes_service.helloworld
  ]

  yaml_body = yamlencode(
    {
      apiVersion = "networking.istio.io/v1alpha3"
      kind       = "VirtualService"
      metadata = {
        name      = "helloworld"
        namespace = "previews"
      }
      spec = {
        gateways = ["dev-s42"]
        hosts    = ["pr-237.previews.s42.dev"]
        http = [
          {
            name = "helloworld"
            route = [
              {
                destination = {
                  host = "helloworld.previews.svc.cluster.local"
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
