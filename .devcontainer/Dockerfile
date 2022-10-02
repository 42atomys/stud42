# [Choice] Go version (use -bullseye variants on local arm64/Apple Silicon): 1, 1.18, 1.17, 1-bullseye, 1.18-bullseye, 1.17-bullseye, 1-buster, 1.18-buster, 1.17-buster
ARG VARIANT=1-bullseye
FROM mcr.microsoft.com/vscode/devcontainers/go:0-${VARIANT}

ENV TERM xterm
ENV SHELL /usr/bin/zsh

# [Choice] Node.js version: none, lts/*, 16, 14, 12, 10
ARG NODE_VERSION="none"
RUN if [ "${NODE_VERSION}" != "none" ]; then su vscode -c "umask 0002 && . /usr/local/share/nvm/nvm.sh && nvm install ${NODE_VERSION} 2>&1"; fi

RUN export DEBIAN_FRONTEND=noninteractive && \
  # Install keydb tools
  echo "deb https://download.keydb.dev/open-source-dist $(lsb_release -sc) main" | tee /etc/apt/sources.list.d/keydb.list && \
  wget -O /etc/apt/trusted.gpg.d/keydb.gpg https://download.keydb.dev/open-source-dist/keyring.gpg && \
  # Update and install packages
  apt-get update && \
  apt-get -y install --no-install-recommends gnupg2 postgresql-client \
  iputils-ping dnsutils vim htop nano sudo curl build-essential zsh wget \
  fonts-powerline tig keydb-tools

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
  ln -s "$NVM_DIR/versions/node/$(nvm version)/bin/npm" "/usr/local/bin/npm" && \
  # Install oh my zsh
  wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | zsh || true && \
  git clone https://github.com/zsh-users/zsh-history-substring-search ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-history-substring-search && \
  git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions && \
  git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting

COPY .devcontainer/.zshrc /root/.zshrc