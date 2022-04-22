# Secrets docs

All Secrets of project with her usage

| Name | Format | Usage |
| --- | --- | --- |
| KUBECONFIG_ADMIN | `kubeconfig`  | Contains the main kubeconfig of the cluster and is set ONLY when create the cluster. For more security this secret is removed after each run of cluster install | 
| SECRET__OVH_CREDENTIALS_SECRET_KEY | `string` | Contains the secret of OVH Application used to generate the certificates with cert-manager 
| SECRET__GHCR_TOKEN | `string` | Contains the Github token to allow pull private package from a private repository of the GitHub Container Registry
| SECRET_REVIEW_APPS_DEPLOYER_TOKEN | `yaml` | Contains the kubernetes secret of the service account `deployer` for the `reviwe-apps` env. (Kubernetes Service YAML Output)
| _K8S_CLUSTER_ENDPOINT | `string` | HTTPS Endpoint of Kubernetes API
| DISCORD_BOT_TOKEN | `string` | Contains the Discord BOT Token without prefix of `Nikolas Kage`