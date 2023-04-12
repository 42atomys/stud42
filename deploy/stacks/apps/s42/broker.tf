locals {
  webhooksQueueName = "webhooks-deliveries"
}

resource "kubernetes_manifest" "rabbitmq_queue_webhooks" {
  manifest = {
    apiVersion = "rabbitmq.com/v1beta1"
    kind       = "Queue"
    metadata = {
      name      = locals.webhooksQueueName
      namespace = var.namespace
    }

    spec = {
      name       = locals.webhooksQueueName
      vhost      = "/"
      durable    = true
      autoDelete = false
    }
  }
}

resource "kubernetes_manifest" "rabbitmq_queue_webhooks_policy" {
  manifest = {
    apiVersion = "rabbitmq.com/v1beta1"
    kind       = "Policy"
    metadata = {
      name      = locals.webhooksQueueName
      namespace = var.namespace
    }

    spec = {
      name    = "${local.webhooksQueueName}-dlx"
      vhost   = "/"
      pattern = locals.webhooksQueueName
      applyTo = "queues"
      definition = {
        "x-dead-letter-exchange"    = "${local.webhooksQueueName}.dlx"
        "x-dead-letter-routing-key" = "${local.webhooksQueueName}.dlx"
      }
    }
  }
}

resource "kubernetes_manifest" "rabbitmq_queue_webhooks_dlx" {
  manifest = {
    apiVersion = "rabbitmq.com/v1beta1"
    kind       = "Queue"
    metadata = {
      name      = "${local.webhooksQueueName}.dlx"
      namespace = var.namespace
    }

    spec = {
      name       = "${local.webhooksQueueName}.dlx"
      vhost      = "/"
      durable    = true
      autoDelete = false
    }
  }
}
