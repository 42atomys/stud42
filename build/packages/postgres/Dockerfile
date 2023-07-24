ARG PACKAGE_VERSION=14.8-alpine3.18

FROM postgres:${PACKAGE_VERSION}

COPY extensions.sh /docker-entrypoint-initdb.d/

RUN chmod 755 /docker-entrypoint-initdb.d/extensions.sh