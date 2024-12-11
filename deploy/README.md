# Deployment

The entire S42 project is deployed on a kubernetes cluster hosted on the OVH cloud and paid for by @42atomys.
You can contribute to the costs by sponsoring the project on [GitHub](https://github.com/sponsors/42atomys).

The kubernetes cluster is composed of 3 node pools:

| Name           | CPU Core | Memory | Disk Space | Auto-scaling | Description                                                            |
| -------------- | -------- | ------ | ---------- | ------------ | ---------------------------------------------------------------------- |
| `small-shared` | 2        | 4Go    | 50Go       | Yes (0-100)  | Shared node pool, cheap, used for tests, previews, non important tasks |
| `small`        | 2        | 7Go    | 50Go       | Yes (2-5)    | Pool of dedicated nodes, used for non greedy apps (default)            |
| `medium`       | 4        | 15Go   | 100Go      | Yes (1-1)    | Pool of dedicated nodes, used for greedy apps or storages              |

Updates are automatically deployed on the kubernetes cluster by
[Github Actions](../.github/workflows/ci.yaml) and [Terraform](https://terraform.io/).

All Terraform modules and stacks are located in this folder [deploy](./).

## Modules

Terraform modules are reusable components that can be used in several
in several stacks. They are used to define the basic resources
necessary for the execution of an application. For example, a module can define
a database service, a cache service, a storage service, etc.

Terraform modules are defined in the folder [modules](./modules/).

## Stacks

Terraform stacks are groups of modules that are used to deploy
an application. For example, a stack can define a web service, a service
worker service, a storage service, etc.

Terraform stacks are defined in the folder [stacks](./stacks/).

We have 3 stacks:

| Name          | Description                                                                       |
| ------------- | --------------------------------------------------------------------------------- |
| `pre-cluster` | Stack preparation of the cluster, defined namespaces, operators                   |
| `cluster`     | Stack of the cluster, defined secrets, certificates, routing configurations istio |
| `apps`        | Stack of applications, defined applications, yes...                               |

## Namespaces

Namespaces are groups of Kubernetes resources that allow you to separate
resources between development, test and production environments,
etc (in our case). Namespaces are defined in the [pre-cluster] stack(./stacks/pre-cluster/kubernetes.tf).

| Name                 | Description                                                                                                         |
| -------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `default`            | Default namespace, not used                                                                                         |
| `cert-manager`       | Namespace for the certificate manager ([https://cert-manager.io](https://cert-manager.io))                          |
| `istio-system`       | Namespace for the routing ([https://istio.io](https://istio.io))                                                    |
| `monitoring`         | Namespace for monitoring components                                                                                 |
| `rabbitmq-operator`  | Namespace for the RabbitMQ controller                                                                               |
| `production`         | Namespace for production (live) applications ([https://s42.app](https://s42.app))                                   |
| `staging`            | Namespace for staging (next) applications ([https://next.s42.app](https://next.s42.app))                            |
| `previews`           | Namespace for preview applications ([https://preview.s42.dev](https://preview.s42.dev))                             |
| `sandbox`            | Namespace for sandboxed applications, used for the development ([https://sandbox.s42.dev](https://sandbox.s42.dev)) |

## Secrets

Secrets contain sensitive information such as passwords, API keys, etc.
API keys, etc. These secrets should never be versioned into the source code
of any application.

All our secrets are encrypted with [SealedSecrets](https://github.com/bitnami-labs/sealed-secrets). This solution allows to store the secrets in the repo by encrypting them. The private key is stored in a Kubernetes secret which is itself encrypted with a TLS certificate. Only the SealedSecrets controller can decrypt the secrets. The private key is updated regularly to increase security.

This way, the secrets are stored in the repo and can be versioned without the risk of leaking sensitive data.
