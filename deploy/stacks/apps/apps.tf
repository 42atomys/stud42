module "s42" {
  source = "./s42"

  appVersion = var.appsVersion["s42"]
  namespace  = var.namespace

  rootDomain                   = var.baseUrl
  hasProvidedJWTKSCertificates = var.hasProvidedJWTKSCertificates
  hasPersistentStorage         = var.hasPersistentStorage
  crawlerEnabled               = var.crawlerEnabled
  webhookProcessorEnabled      = var.webhooksEnabled
}

module "webhooked" {
  source  = "./webhooked"
  enabled = var.webhooksEnabled

  appVersion = "0.6.4"
  namespace  = var.namespace
}
