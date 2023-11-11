#! /bin/bash

sed -i "/^$(echo $(cat /workspace/.devcontainer/.env) | grep "=" | cut -d'=' -f1)/c $(cat /workspace/.devcontainer/.env)" /etc/environment

