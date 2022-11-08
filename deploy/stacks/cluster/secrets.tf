module "secrets" {
  source = "../../modules/sealed-secrets"

  sealedSecrets = {
    "ghcr-creds" = {
      secretType    = "kubernetes.io/dockerconfigjson"
      isClusterWide = true
      reflected     = true

      encryptedData = {
        ".dockerconfigjson" : "AgCJD5bnLWkf5wx+OeK9X5Li8ZO6hdwVU8hDkIOeE4HM6TgyqKWkSa3nAEoKSTr9AepWkMuwalCLcgQo7cN0Hcxyk0Ryg3gjlKnu7TYJief+ZXOShpCalgvlDMsRET4lWMPiFyAHBLLgbilRx9H3E9q0t8QqjQo+a/KrYMmOnT8bCTV9MvO4AtLY0AItKxIuvsDjQgwJKbGgR7vzEjn4cDRwSyL6kIkBsFiooQCOByn7vw/+dqjpFQaSoEk+X6wHxQeCZc0uXgfS5J9yMje0usJ7UaEbePR04n5HK3P5T3GXDaPT5aTuBRZ4lNuE/8nhnwy1vUu+27JG75n/fCfW9qX5DklSvkMreR9mf6ZlZ1eWgzdkL4ex81iyN7RK/GdqICowt74zWYTVgrkh4GJ8dt2RhLH2ijuEFJafUpjeOVetkZCqe4qqPlKB1znDu3VXufDSqgAoPEjeMOddeP4FoNvFpVqpNsa68X/GqN9M62TXi+8sq+DiON1m2Lc1sBoGMEJMt+d6T2BM2gvKdgkjFojIiYBO6Lt3PI6dVsaisSwr6R/bkCs5DvEh8m/AqrMhc1iOxGp2LMJRwSu0Za8UP+JZR5+xg/Uyyuz2tu7WnoIfRzQinYLSfdPsOaRul1/7HmllWYyXa8UBGkhH+qhNPxsb7Gw6Nk3VdalKuSxrsw68l+zKZUluKBH8+1mhinOBqhxXW1ocGWxcTuKIQPOPXDPbA7/ZBcx5pcs7Fk3dahCM+Z0W2/nKHZjP5dLTVT5Rs8uwfe+7JoIXAOGD95ymvm4EvETc1b7jNKRs9MlRfkqpvnjbZRcce1Y6ZU4LKk2MWKHKDveNHHjijEF2S2x46/WbL2h7Y6Kw6XOUfhW/j+QtdZeniteXR3E9Is9lXwGj1Z6yqyenNhgI2/43cWG1UOfECq/r/HWAa8uUVTjB6uxOjMQ="
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
