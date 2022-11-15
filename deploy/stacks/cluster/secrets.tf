module "secrets" {
  source = "../../modules/sealed-secrets"

  sealedSecrets = {
    "ghcr-creds" = {
      secretType          = "kubernetes.io/dockerconfigjson"
      isClusterWide       = false
      namespace           = "kube-system"
      reflected           = true
      reflectedNamespaces = ["production", "staging", "previews", "sandbox"]

      encryptedData = {
        ".dockerconfigjson" : "AgA6cjvRXnpCTnZDf3gt3Co+K/i+TUShOBhbT+0N0JqJai/EQYDJBWriKFB7AzujY13iBTiP0HykKAmA+CfrB8nd2Q775cIDvpyQlHhc2dU/zUs3wpboIZroq2bGrEOUqw9bcWh/oCaTX3krEjyVROdI71FJ4QIfER5EceeI33KT+gDfQLnW6b6DAL26Vh+obMvTyso7iaeHywfC2GI0QDRxjg2rHajZOE4ciHZj3wOkMaT5p5pgpt0CsQlubkkE4Rv0qdt0fZA/MPgYdL+XfiVYQfz3aR4IMHV0l0AwdVEQkUrTLWR4DIRM3xhaHLnWiIiS5Ks53gK3yJEy/3r1yoNi5Cs2TMGab/utf7O8ZwDrbrRpzI3atk+E/WCDdg7STXHR/N0cxSCeUUdoFbHnx+u5AcdW3mLQsEXjpQG8xW6y3ThS1jpi/j6Nmn6JoAvgZlWBKNiNR33tQrRtgDSi8+6GBijl4IYky/V/OZ1TccKUZZwT0lYneDtwjWYuKtdzXFrrOczhconvNrnwYnKuy/nyq91fVBdOkY1r7otIYCPFPXCIASpT8VhaIlnNHBes0QdPQILyI+xxlOMiW/pJ2/QG6c2dPzgIYxVeIo5E4wdOfnXEp6AESnBrOkKvwm9tVh7RuK6tPgp5wzbNkOoJC8jA5AKtlWmFhPABN5TzfrKoIR5q0Bc/YOSkSJuMJVC7lgzBE1OOqm8jHhpM3OEon7lAAyJOMTj8zTlU1Y/DecL7dpM6WG8DvaFj/1L7RCoKFNPn0R5clXQ2/8urm86mp1QaVBcLxsi0CcTO4Xznii8GAoyr9HLJnVipCvA58XCk85q+8a7Nf7g+a46CsP1qLj6yahYIY9R7HPLKAN+kkNPGfvKUlsiB6hE9mXkKl9WBFemudfKujPdNq7DbWKS891Cz3pgV8i/GKr2iYkUazyeVMWU="
      }
    }

    "ovh-credentials" : {
      namespace     = "cert-manager"
      isClusterWide = false

      encryptedData = {
        "OVH_APPLICATION_KEY" : "AgCSvMJkd3k2yN68aX+pAIW07icd/SFWHWhzi+5baHI8ECpXoepX6F7p4YqFRAnGyuQOMNi3oi+kCvx3Vq6QSZwpcLLMXtJwAhhEhhFzHoxAbwcVAjOz3l+OKzMGDkCzIBOA4UNV0l/Nxex840XrGRJH5qK4GijdJqnA3M5ZOTDZqwqubhv+7q1br1aKqNmnrnTCrSETY3bxObsYNCwiJfsV4/lLiCKBj9Rr66EZxJb2JX+NwHqYx3Dn5rORr8E65bMy2sTSTwzIVWoBpYBt2E/aUS8r+ZlDZCXlNhoyRNZYwhMio+yR3iCTAiWQQRp8XgmQrA+RqC6nEfUenz0RAMSwG7wgRdChOiUOAOJAX1D9MebiI36IOEth/4cf4X84LcwYGDjxtS0Q3FazI1IPX7PqrUscx7rCFoL26k9dUsLD8SczsrcPMsEL2JyGJ5Wn8hFKS5XFDKTEcMWXiA8tyyuM04k82coLQAhzinjiAaDOxgzZ7Yzbgn0Q9PKcck698TMa3dlIuFHn/9XP53qx77pKpa06NJhxiMwW3tmzYYxZox+6OSKD2M2DmC3Od1EGEMOixY2ira2AG0bEqw3eeuQkOotHUzrOg3EMsQaz4url8H/PYTGnNTCdFAZiYew40rqdmUGKDx5/8fnGp7EM0PrmgV7vHiJ+EHKn0v6UNirjVih/q++eDvOf5Os2tR6YA1OCjBtiQlXtYFchlqyKuUzi59rXkgGAvMOgpmSp4Tqg6w=="
      }
    }
  }
}
