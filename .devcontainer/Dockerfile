# [Choice] Go version (use -bullseye variants on local arm64/Apple Silicon): 1, 1.18, 1.17, 1-bullseye, 1.18-bullseye, 1.17-bullseye, 1-buster, 1.18-buster, 1.17-buster
ARG VARIANT=1-bullseye
FROM mcr.microsoft.com/vscode/devcontainers/go:0-${VARIANT}

# [Choice] Node.js version: none, lts/*, 16, 14, 12, 10
ARG NODE_VERSION="none"
RUN if [ "${NODE_VERSION}" != "none" ]; then su vscode -c "umask 0002 && . /usr/local/share/nvm/nvm.sh && nvm install ${NODE_VERSION} 2>&1"; fi

RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
  && apt-get -y install --no-install-recommends gnupg2 postgresql-client \
  iputils-ping dnsutils vim htop nano sudo curl build-essential zsh wget \
  fonts-powerline

# Install global node packages.
RUN npm install --location=global tslint-to-eslint-config typescript \
  @commitlint/cli @commitlint/config-conventional && \
  # Install dependencies
  wget -qO /tmp/protoc.zip $(curl -s https://api.github.com/repos/protocolbuffers/protobuf/releases/latest | \
  jq -c ".assets | map(select( .name | contains(\"protoc\") and contains(\"$(uname -m)\") and contains(\"linux\"))) | .[].browser_download_url" | \
  tr -d '\"') && \
  unzip -uo /tmp/protoc -d /usr/local bin/protoc && \
  # Workarround due toyarn dont have permission to write on node_modules
  ln -s "$NVM_DIR/versions/node/$(nvm version)/bin/node" "/usr/local/bin/node" && \
  ln -s "$NVM_DIR/versions/node/$(nvm version)/bin/npm" "/usr/local/bin/npm"

USER vscode

# Configure git
RUN git config --global pull.rebase true && \
  git config --global core.hooksPath /workspace/githooks && \
  git config --global commit.gpgsign true