locals {
  rabbitmqProcessingQueueSuffix = "processing"
  rabbitmqDeadLetterQueueSuffix = "dlq"

  rabbitmqWebhooksName           = "webhooks"
  rabbitmqWebhooksProcessingName = "${local.rabbitmqWebhooksName}.${local.rabbitmqProcessingQueueSuffix}"
  rabbitmqWebhooksDlqName        = "${local.rabbitmqWebhooksName}.${local.rabbitmqDeadLetterQueueSuffix}"
}

resource "kubernetes_manifest" "rabbitmq_exchange_webhooks" {
  depends_on = [
    kubernetes_manifest.rabbitmq
  ]
  manifest = {
    apiVersion = "rabbitmq.com/v1beta1"
    kind       = "Exchange"
    metadata = {
      name      = local.rabbitmqWebhooksName
      namespace = var.namespace
    }

    spec = {
      name                     = local.rabbitmqWebhooksName
      type                     = "direct"
      durable                  = true
      autoDelete               = false
      rabbitmqClusterReference = local.rabbitmqClusterReference
    }
  }
}

resource "kubernetes_manifest" "rabbitmq_queue_webhooks_processing" {
  manifest = {
    apiVersion = "rabbitmq.com/v1beta1"
    kind       = "Queue"
    metadata = {
      name      = local.rabbitmqWebhooksProcessingName
      namespace = var.namespace
    }

    spec = {
      name                     = local.rabbitmqWebhooksProcessingName
      durable                  = true
      autoDelete               = false
      rabbitmqClusterReference = local.rabbitmqClusterReference
    }
  }
}

resource "kubernetes_manifest" "rabbitmq_queue_webhooks_dlq" {
  manifest = {
    apiVersion = "rabbitmq.com/v1beta1"
    kind       = "Queue"
    metadata = {
      name      = local.rabbitmqWebhooksDlqName
      namespace = var.namespace
    }

    spec = {
      name                     = local.rabbitmqWebhooksDlqName
      durable                  = true
      autoDelete               = false
      rabbitmqClusterReference = local.rabbitmqClusterReference
    }
  }
}

resource "kubernetes_manifest" "rabbitmq_binding_webhooks_dlq" {
  manifest = {
    apiVersion = "rabbitmq.com/v1beta1"
    kind       = "Binding"
    metadata = {
      name      = local.rabbitmqWebhooksDlqName
      namespace = var.namespace
    }

    spec = {
      source                   = local.rabbitmqWebhooksName
      destination              = local.rabbitmqWebhooksDlqName
      destinationType          = "queue"
      routingKey               = local.rabbitmqWebhooksDlqName
      rabbitmqClusterReference = local.rabbitmqClusterReference
    }
  }
}

resource "kubernetes_manifest" "rabbitmq_policy_webhooks_dlq" {
  manifest = {
    apiVersion = "rabbitmq.com/v1beta1"
    kind       = "Policy"
    metadata = {
      name      = local.rabbitmqWebhooksDlqName
      namespace = var.namespace
    }

    spec = {
      name    = local.rabbitmqWebhooksDlqName
      pattern = local.rabbitmqWebhooksProcessingName
      applyTo = "queues"
      definition = {
        "dead-letter-exchange"    = local.rabbitmqWebhooksName
        "dead-letter-routing-key" = local.rabbitmqWebhooksDlqName
      }
      rabbitmqClusterReference = local.rabbitmqClusterReference
    }
  }
}
