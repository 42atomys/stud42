#!/bin/bash

OS=$(([ "$(uname -s)" == 'Darwin' ] && echo "osx" || echo "$(uname -s)") | tr '[:upper:]' '[:lower:]')
URL=$(curl -s https://api.github.com/repos/protocolbuffers/protobuf/releases/latest | \
  jq -c ".assets | map(select( .name | contains(\"protoc\") and contains(\"$(uname -m)\") and contains(\"$OS\"))) | .[].browser_download_url" | \
  tr -d \")

if [ -z "$URL" ]; then
  echo "Could not find protoc binary for your platform. Fallback to linux"
  URL=$(curl -s https://api.github.com/repos/protocolbuffers/protobuf/releases/latest | \
    jq -c ".assets | map(select( .name | contains(\"protoc\") and contains(\"x86_64\") and contains(\"linux\"))) | .[].browser_download_url" | \
    tr -d \") 
fi

echo "Downloading protoc... $URL"
wget -qO /tmp/protoc.zip $URL
unzip -uo /tmp/protoc -d /usr/local bin/protoc

# Special installation of grpc-tools due to missing precompiled binaries 
# on linux ARM64
# See https://github.com/grpc/grpc-node/issues/1405
if [[ "$(uname -m)" == "aarch64" || "$(uname -m)" == "arm64"  ]]; then
  echo "Manual install of grpc-tools on arm64."

  yarn add --cwd web/ui grpc-tools --ignore-scripts
  pushd web/ui/node_modules/grpc-tools || exit
  node_modules/.bin/node-pre-gyp install --target_arch=x64
  popd || return
fi