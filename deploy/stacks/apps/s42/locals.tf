locals {
  // reversedRootDomain is the root domain name, reversed, for use in the
  // reverse proxy configuration. For example, if the root domain is
  // example.tld, the reversed root domain is tld-example
  // If the root domain is pr-23.previews.example.tld, the reversed root
  // domain is tld-example-previews
  reversedRootDomain = join(
    "-",
    slice(
      reverse(split(".", var.rootDomain)),
      0,
      min(3, length(split(".", var.rootDomain)))
    )
  )

  // nodepoolSelector is a selector that matches all nodes in the node pool
  // that the application is deployed to
  nodepoolSelector = {
    storages = {
      nodepool = var.namespace == "production" ? "medium" : var.namespace == "staging" ? "small" : "small-shared"
    }
    services = {
      nodepool = var.namespace == "production" ? "small" : var.namespace == "staging" ? "small" : "small-shared"
    }
  }

  // campusToRefreshEachHourManually is a list of campus IDs that should be
  // refreshed each hour manually. This is a workaround for a bug in the
  // interconnection between the Intra API and S42. This is a workaround for
  // the following bug
  campusToRefreshEachHourManually = {
    helsinki = 13
    lausanne = 47
    malaga   = 37
    mulhouse = 48
    paris    = 1
    seoul    = 29
    tokyo    = 26
    vienna   = 53
  }
}
