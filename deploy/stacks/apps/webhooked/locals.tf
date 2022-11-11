locals {
  // nodepoolSelector is a selector that matches all nodes in the node pool
  // that the application is deployed to
  nodepoolSelector = {
    nodepool = var.namespace == "production" ? "medium" : var.namespace == "staging" ? "small" : "small-shared"
  }
}
