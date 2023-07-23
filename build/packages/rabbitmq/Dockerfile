ARG PACKAGE_VERSION=3.11.13-management
FROM rabbitmq:${PACKAGE_VERSION}

ENV RABBITMQ_DELAYED_MESSAGE_PLUGIN_VERSION=3.11.1

RUN apt-get update && \
  apt-get install -y curl && \
  curl -L https://github.com/rabbitmq/rabbitmq-delayed-message-exchange/releases/download/$RABBITMQ_DELAYED_MESSAGE_PLUGIN_VERSION/rabbitmq_delayed_message_exchange-$RABBITMQ_DELAYED_MESSAGE_PLUGIN_VERSION.ez > $RABBITMQ_HOME/plugins/rabbitmq_delayed_message_exchange-$RABBITMQ_DELAYED_MESSAGE_PLUGIN_VERSION.ez &&\
  chown rabbitmq:rabbitmq $RABBITMQ_HOME/plugins/rabbitmq_delayed_message_exchange-$RABBITMQ_DELAYED_MESSAGE_PLUGIN_VERSION.ez &&\
  rabbitmq-plugins enable --offline rabbitmq_delayed_message_exchange
