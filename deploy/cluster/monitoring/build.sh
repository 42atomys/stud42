#!/usr/bin/env bash

set -e
set -x
# only exit with zero if all commands of the pipeline exit successfully
set -o pipefail
# Make sure to use project tooling
PATH="$(pwd)/tmp/bin:${PATH}"

jb init
jb install github.com/prometheus-operator/kube-prometheus/jsonnet/kube-prometheus@main

mkdir -p manifests/setup

jsonnet -J vendor -m manifests "template.jsonnet" | xargs -I{} sh -c 'mv {} {}.json' -- {}
find manifests -type f ! -name '*.json' -delete
rm -f kustomization

sed -i -e 's/"replicas": 3/"replicas": 1/g' manifests/alertmanager-alertmanager.json
sed -i -e 's/"replicas": 2/"replicas": 1/g' manifests/prometheus-prometheus.json

kubectl apply --server-side -f manifests/setup
kubectl apply --server-side -f manifests