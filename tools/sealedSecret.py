# Generate a new sealed secret for the given namespace and object data
# Usage: python3 create.py --name <name> --namespace <namespace> --data <key>=<value> [<key>=<value> ...]

import argparse
import base64
import json
import subprocess

parser = argparse.ArgumentParser(description='Convert a secret to a sealed secret.')

parser.add_argument('--name', metavar='N', nargs=1, type=str, help='The name of the secret to create')
parser.add_argument('--namespace', metavar='n', nargs=1, type=str, help='The namespace to create the secret in')
parser.add_argument('--data', metavar='d', nargs='+', type=str, help='The data to encrypt')
args = parser.parse_args()

# Convert the data to a dictionary of key/value pairs and base64 encode
# the values
data = {}
for item in args.data:
  key, value = item.split('=', 1)
  value = base64.b64encode(value.encode('utf-8')).decode('utf-8')
  data[key] = value

# Generate the sealed secret
secret = {
  "apiVersion": "v1",
  "kind": "Secret",
  "metadata": {
    "name": args.name[0],
    "namespace": args.namespace[0],
    "annotations": {
      "sealedsecrets.bitnami.com/cluster-wide": "false",
      "sealedsecrets.bitnami.com/namespace-wide": "true",
    },
  },
  "data": data,
}

# Encode the secret as a JSON string and encrypt the secret
encrypted_secret = subprocess.check_output(
  ["kubeseal", "--format", "json"],
  input=json.dumps(secret),
  encoding="utf-8",
)

# Print the encrypted secret 
print(
  json.dumps(
    json.loads(encrypted_secret)['spec']['encryptedData'],
    indent=2,
  ).replace('": "', '" = "')
)