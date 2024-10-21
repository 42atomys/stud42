FROM mcr.microsoft.com/devcontainers/base

# Avoid warnings by switching to noninteractive
ENV DEBIAN_FRONTEND=noninteractive \
    TERM=xterm

RUN apt-get update \
    && apt-get -y install --no-install-recommends wget \
    && wget -O /usr/local/bin/rabbitmqadmin https://raw.githubusercontent.com/rabbitmq/rabbitmq-management/v3.7.8/bin/rabbitmqadmin \
    && chmod +x /usr/local/bin/rabbitmqadmin

WORKDIR /workspace
