resource "kubernetes_config_map" "stud42_config" {
  name      = "stud42-config"
  namespace = var.namespace
  labels = {
    "kubernetes.io/name"           = "stud42-config"
    "app.kubernetes.io/part-of"    = "stud42"
    "app.kubernetes.io/managed-by" = "terraform"
    "app.kubernetes.io/created-by" = "github-actions"
  }

  data = {
    stud42.yaml = file("${path.root}/configs/stud42/stud42.yaml")
  }
}
