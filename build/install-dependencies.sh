#!/bin/bash

OS=$([ "$(uname -s)" == 'Darwin' ] && echo "osx" || echo "$(uname -s)")
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