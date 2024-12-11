locals {
  // nodepoolSelector is a selector that matches all nodes in the node pool
  // that the application is deployed to
  nodepoolSelector = {
    "cloud.google.com/gke-nodepool" = "pool-high-workers"
  }
}
