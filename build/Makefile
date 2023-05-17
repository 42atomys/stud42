# This makefile MUST be run from the root of the repository.
# You can do this by running:
#   make -f build/Makefile [action]

generate:
	go generate generate.go
	go generate cmd/jwtks.go

build:
	CGO_ENABLED=0 GOARCH=amd64 GOOS=linux go build -o stud42cli

clean:
	rm -rf internal/api/generated 
	rm -rf internal/models/generated

regenerate: clean generate

certs:
	mkdir -p certs
	openssl genrsa -out certs/private.key 8192
	openssl rsa -in certs/private.key -out certs/public.pem -pubout -outform PEM

deps:
	./build/install-dependencies.sh

devcontainer-init: generate certs deps
	wget -O ./bin/rabbitmqadmin http://rabbitmq:15672/cli/rabbitmqadmin && chmod +x ./bin/rabbitmqadmin
	wget -O ./bin/mc https://dl.min.io/client/mc/release/darwin-amd64/mc && chmod +x ./bin/mc
	cp config/stud42.example.yaml config/stud42.yaml
	go mod download
	yarn --cwd web/ui install
	yarn --cwd web/ui generate

all:
	deps
	generate
	build

.PHONY: certs clean deps generate build all