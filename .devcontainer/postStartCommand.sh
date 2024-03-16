#!/bin/bash

PROFILE_PATH="/etc/profile.d/01-devcontainer-env-sync.sh"

# Load /etc/profile in /etc/zshenv
echo "Sourcing /etc/profile in zsh"
sudo sh -c "echo \"source /etc/profile\" > /etc/zshenv"
sudo sh -c "echo \"source /etc/profile\" > /home/vscode/.zshenv"

# Load the .env file
echo "Loading .env file into ${PROFILE_PATH}"
sudo touch ${PROFILE_PATH}
while read -r line || [ -n "$line" ]; do
    if [ "${line#\#}" = "$line" ] && echo "$line" | grep -q "="; then
        key=$(echo $line | cut -d '=' -f1)
        echo "Sync $key from .devcontainer/.env to ${PROFILE_PATH}"
        # Check if key is already in ${PROFILE_PATH}
        if sudo grep -q "^export $key=" ${PROFILE_PATH}; then
            # If key is in ${PROFILE_PATH}, update the value
            sudo sed -i "/^export $key=/c$line" ${PROFILE_PATH}
        else
            # If key is not in ${PROFILE_PATH}, add the line
            echo "export $line" | sudo tee -a ${PROFILE_PATH} > /dev/null
        fi
    fi
done < /workspace/.devcontainer/.env
echo "Environment variables loaded"
