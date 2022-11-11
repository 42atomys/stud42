module "cert_manager" {
  source = "../../modules/cert-manager"

  issuers = {
    "ovh-issuer" = {
      is_self_signed          = false
      acme_server             = "https://acme-v02.api.letsencrypt.org/directory"
      private_key_secret_name = "letsencrypt-account-key"
      solvers = [
        {
          dns01 = {
            webhook = {
              groupName  = "acme.s42.app"
              solverName = "ovh"
              config = {
                endpoint       = "ovh-eu"
                applicationKey = "UsCsfHBWCye7M1DM"
                applicationSecretRef = {
                  name = "ovh-credentials"
                  key  = "OVH_APPLICATION_KEY"
                }
                consumerKey = "XIDSwFARyRPlTVy5EIkJBB1fA3S7iub7"
              }
            }
          }
        }
      ]
    },
    "ovh-staging-issuer" = {
      is_self_signed          = false
      acme_server             = "https://acme-staging-v02.api.letsencrypt.org/directory"
      private_key_secret_name = "letsencrypt-account-key"
      solvers = [
        {
          dns01 = {
            webhook = {
              groupName  = "acme.s42.app"
              solverName = "ovh"
              config = {
                endpoint       = "ovh-eu"
                applicationKey = "UsCsfHBWCye7M1DM"
                applicationSecretRef = {
                  name = "ovh-credentials"
                  key  = "OVH_APPLICATION_KEY"
                }
                consumerKey = "XIDSwFARyRPlTVy5EIkJBB1fA3S7iub7"
              }
            }
          }
        }
      ]
    },
    "selfsigned-issuer" = {
      name           = "selfsigned-issuer"
      is_self_signed = true
    },
  }

  certificates = {
    "app-s42" = {
      dns_names   = ["s42.app", "*.s42.app"]
      issuer_name = "ovh-issuer"
    }
    "app-s42-next" = {
      dns_names   = ["next.s42.app", "*.next.s42.app"]
      issuer_name = "ovh-issuer"
    }
    "dev-s42" = {
      dns_names   = ["s42.dev", "*.s42.dev", "*.sandbox.s42.dev"]
      issuer_name = "ovh-issuer"
    }
    "dev-s42-previews" = {
      dns_names   = ["*.previews.s42.dev"]
      issuer_name = "ovh-issuer"
    }
  }
}
