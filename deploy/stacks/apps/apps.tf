module "s42" {
  source = "./s42"

  appVersion = var.appsVersion["s42"]
  namespace  = "production"

  rootDomain                   = var.baseUrl
  hasProvidedJWTKSCertificates = true
  hasPersistentStorage         = true
  # crawlerEnabled               = true
  webhookProcessorEnabled = true
}

module "webhooked" {
  source = "./webhooked"

  appVersion = var.appsVersion["webhooked"]
  namespace  = "production"
}
