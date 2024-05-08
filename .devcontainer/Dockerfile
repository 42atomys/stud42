# [Choice] Go version (use -bullseye variants on local arm64/Apple Silicon): 1, 1.18, 1.17, 1-bullseye, 1.18-bullseye, 1.17-bullseye, 1-buster, 1.18-buster, 1.17-buster
ARG VARIANT=1-bullseye
FROM mcr.microsoft.com/vscode/devcontainers/go:${VARIANT}

ENV TERM xterm
ENV SHELL /usr/bin/zsh

# [Choice] Node.js version: none, lts/*, 16, 14, 12, 10
ARG NODE_VERSION="18"
RUN if [ "${NODE_VERSION}" != "none" ]; then umask 0002 && . /usr/local/share/nvm/nvm.sh && nvm install ${NODE_VERSION} 2>&1; fi

RUN ARCH=$([ "`uname -m`" = "aarch64" ] && echo "arm64" || echo "amd64") && \ 
  apt-get update && export DEBIAN_FRONTEND=noninteractive \
  && apt-get -y install --no-install-recommends gnupg2 postgresql-client \
  iputils-ping dnsutils vim htop nano sudo curl build-essential zsh wget jq \
  fonts-powerline tig ca-certificates software-properties-common redis-tools && \
  # Install kubectl from binaries
  curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/${ARCH}/kubectl" && \
  install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl && \
  kubectl version --client && \
  # Install helm from binaries
  curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash && \
  # Install terraform from binaries
  # See: https://github.com/42Atomys/stud42/issues/298
  # if $(uname -m) == "aarch64" set TERRAFORM_ARCH to "arm64" in shell format
  wget --no-verbose --show-progress --progress=dot:mega -O /tmp/terraform.zip "https://releases.hashicorp.com/terraform/1.3.6/terraform_1.3.6_linux_${ARCH}.zip" && \
  unzip /tmp/terraform.zip -d /usr/local/bin/ && \
  # Install minio mc
  wget --no-verbose --show-progress --progress=dot:mega "https://dl.min.io/client/mc/release/linux-${ARCH}/mc" && \
  install -m 755 mc /usr/local/bin/mc && \
  # Install kubeseal
  KUBESEAL_VERSION=$(curl -s https://api.github.com/repos/bitnami-labs/sealed-secrets/tags | jq -r '.[0].name' | cut -c 2-) && \
  if [ -z "$KUBESEAL_VERSION" ]; then \
  echo "Failed to fetch the latest KUBESEAL_VERSION"; \
  exit 1; \
  fi && \
  wget --no-verbose --show-progress --progress=dot:mega "https://github.com/bitnami-labs/sealed-secrets/releases/download/v${KUBESEAL_VERSION}/kubeseal-${KUBESEAL_VERSION}-linux-${ARCH}.tar.gz" && \
  tar -xvzf kubeseal-${KUBESEAL_VERSION}-linux-amd64.tar.gz kubeseal && \
  install -m 755 kubeseal /usr/local/bin/kubeseal

# Install global node packages.
RUN npm install --location=global tslint-to-eslint-config typescript \
  @commitlint/cli @commitlint/config-conventional && \
  # Workarround due toyarn dont have permission to write on node_modules
  ln -s "$NVM_DIR/versions/node/$(nvm version)/bin/node" "/usr/local/bin/node" && \
  ln -s "$NVM_DIR/versions/node/$(nvm version)/bin/npm" "/usr/local/bin/npm" && \
  # Install oh my zsh
  wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | zsh || true && \
  git clone https://github.com/zsh-users/zsh-history-substring-search ${ZSH_CUSTOM:-/root/.oh-my-zsh}/plugins/zsh-history-substring-search && \
  git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-/root/.oh-my-zsh}/plugins/zsh-autosuggestions && \
  git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-/root/.oh-my-zsh}/plugins/zsh-syntax-highlighting

# Pre-download the golang part
WORKDIR /workspace
COPY go.mod go.sum ./

RUN go mod download

COPY .devcontainer/.zshrc /root/.zshrc
