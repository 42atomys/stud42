# GOLANG BUILD - BUILD
FROM golang:1.20 AS go-build

WORKDIR /build
COPY . /build

ARG APP_VERSION
ENV APP_VERSION=$APP_VERSION

RUN apt-get update && \
  apt-get install -y unzip jq && \
  make -f build/Makefile generate && \
  make -f build/Makefile build

# INTERFACE BUILD - DEPS
FROM node:18 AS node-deps
WORKDIR /build
COPY web/ui/package.json web/ui/yarn.lock ./
RUN yarn install --frozen-lockfile

# INTERFACE BUILD - BUILD
FROM node:18 AS node-builder
WORKDIR /build
COPY --from=node-deps /build/node_modules ./node_modules
COPY . .

ARG APP_VERSION
ENV APP_VERSION=$APP_VERSION
ENV NEXT_TELEMETRY_DISABLED 1

RUN apt-get update -y && \
  apt-get install -y jq && \
  cd web/ui && \
  yarn add -D @graphql-codegen/cli && \
  yarn generate && yarn build


# RUNNER 
FROM node:18-alpine AS runner

LABEL maintener "42Atomys <contact@atomys.fr>"
LABEL repository "https://github.com/42Atomys/stud42"

WORKDIR /app

ARG APP_VERSION
ENV APP_VERSION=$APP_VERSION
ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=node-builder /build/web/ui/next.config.js ./
COPY --from=node-builder /build/web/ui/public ./public
COPY --from=node-builder /build/web/ui/package.json ./package.json
COPY --from=node-builder /build/web/ui/.next ./.next
COPY --from=node-builder /build/web/ui/.next/standalone ./

COPY --from=go-build /build/stud42cli /usr/local/bin/stud42cli

CMD ["stud42cli"]