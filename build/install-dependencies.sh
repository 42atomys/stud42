#!/bin/bash

OS=$([ "$(uname -s)" == 'Darwin' ] && echo "osx" || echo "$(uname -s)")
curl -s https://api.github.com/repos/protocolbuffers/protobuf/releases/latest | \
  jq -c ".assets | map(select( .name | contains(\"protoc\") and contains(\"$(uname -m)\") and contains(\"$OS\"))) | .[].browser_download_url" | \
  tr -d \" | \
  xargs wget -O /tmp/protoc.zip
unzip -uo /tmp/protoc -d /usr/local bin/protoc