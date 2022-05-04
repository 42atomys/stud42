# Monitoring

[Official documentation](https://github.com/prometheus-operator/kube-prometheus/blob/main/docs/customizing.md)

For deploy monitoring we need to generate json files with `jb` command.

Run the script `build.sh` for json files and apply in the cluster.

The script init workdir with `jb`, download some components mandatory, edit json files for scale down replicas and apply on the cluster.