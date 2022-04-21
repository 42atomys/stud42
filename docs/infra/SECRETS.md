# Secrets docs

All Secrets of project with her usage

| Name | Usage |
| --- | --- |
| KUBECONFIG_ADMIN | Content the main kubeconfig of the cluster and is set ONLY when create the cluster. For more security this secret is removed after each run of cluster install | 
| SECRET__OVH_CREDENTIALS_SECRET_KEY | Contain the secret of OVH Application used to generate the certificates with cert-manager