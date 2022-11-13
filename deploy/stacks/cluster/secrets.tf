module "secrets" {
  source = "../../modules/sealed-secrets"

  sealedSecrets = {
    "ghcr-creds" = {
      secretType    = "kubernetes.io/dockerconfigjson"
      isClusterWide = true
      reflected     = true

      encryptedData = {
        ".dockerconfigjson" : "AgA0gQETza4ZHq7T/AWRxd4mXk4CBlJS7nyWrQ2NloNDIcRp3iGkj+N6uCGtxeqo2Xuz5mtDYzQ6WMqg2FfqJVIg2FQeW7Vkadm38ZApnp6gA9+qYFqDPFjwyhHVEtu4rSR1oz+AFcQKPEJbwDoeOhxnJxyn8jU+EqgZl7MLflgFSLb+4gqVCeBoonDWU8AUzZW9cITHQVhdylozGkbI9je+xbjZKwGXymSq8NfOed99FGvml1+7LcYQJl/VhuFtviFET8CrFy223EVdeVj3mmSXdyzhGQhbud3fPM0AfDXybY8b277La+bUXq1qTfE9WlQGoW+GWqhUqZYjFwRBOD+F8YJS2GUyPIIETUGKO172JndRTGvmagvkYmf/uCKXHHYXdT8Fh8Xru7KNPYFpdfM/NowwQvRzTSfQYwiorNIht98prHX/cYmdS1kCzZjQ7P10wRUOHgyB85LcSvDQ53vphr7WekrJqW5C8EbqZSRoj6qTKjtk5ovG2OBZMVtqAbTLCiJ1nrK+FsSTrNZiIX2hOMW4DgEwg3bxFF9VT4d/KQ6KwSOV3AoqAnDdRjLyoiM19Q439hW+47ONyktq5YEvr+R+4wWlSWtPrO9LbiE+V+IiAJFurg3EWtYqD/rBCemiFDfC3y/JadEte+t3spHMbG/x6CRypls2ETqIbKiX2r/H26/5uH3sGUieP+zKAdzq06dTHlPjVcHpKOel3x4oiPdtLo7QnqITp5CxP9Cm/T0IGAsQYbNreh8XU/rrdTFcqWzU0G9kIqWpTmNVLDpOaBvw3/Me7lETPX8prALN7Vb8ZR5QgxFRlROFBznFhuk34Zb6yfwCfKyV3QKehxqGBRYWGKkUaejt1fjVt0O/eMwYmhx2lFjsC88q0dplRwzfcjB+1dd8573m1Fi2wrJli5d3v6e+bGurTdhAw0+ccBc="
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
