
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
	openssl genrsa -out certs/private.key 4096
	openssl rsa -in certs/private.key -out certs/public.pem -pubout -outform PEM

deps:
	wget -O /tmp/protoc.zip https://github.com/protocolbuffers/protobuf/releases/download/v3.20.1/protoc-3.20.1-linux-x86_64.zip
	unzip -uo /tmp/protoc -d /usr/local bin/protoc
	unzip -uo /tmp/protoc -d /usr/local "include/*"

all:
	deps
	generate
	build

.PHONY: clean deps generate build all