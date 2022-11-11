locals {
  defaultLabels = {
    "app"                          = var.appName
    "version"                      = var.appVersion
    "kubernetes.io/name"           = var.name
    "app.kubernetes.io/version"    = var.appVersion
    "app.kubernetes.io/part-of"    = var.appName
    "app.kubernetes.io/managed-by" = "terraform"
    "app.kubernetes.io/created-by" = "github-actions"
  }
}
