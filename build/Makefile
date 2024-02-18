# This makefile MUST be run from the root of the repository.
# You can do this by running:
#   make -f build/Makefile [action]

generate:
	go generate generate.go

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

devcontainer-init: generate certs
	wget -O ./bin/rabbitmqadmin http://rabbitmq:15672/cli/rabbitmqadmin && chmod +x ./bin/rabbitmqadmin
	cp config/stud42.example.yaml config/stud42.yaml
	yarn --cwd web/ui install
	yarn --cwd web/ui generate

.PHONY: build generate 