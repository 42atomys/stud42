
generate:
	go generate generate.go
	go generate cmd/jwtks.go

build:
	go build -o stud42cli

clean:
	rm -rf internal/api/generated 
	rm -rf internal/models/generated

regenerate: clean generate

certs:
	mkdir -p certs
	openssl genrsa -out certs/private.key 4096
	openssl rsa -in certs/private.key -out certs/public.pem -pubout -outform PEM

deps:
	wget -O /tmp/protoc.zip https://github.com/protocolbuffers/protobuf/releases/download/v3.20.0/protoc-3.20.0-linux-x86_64.zip
	unzip -ud /tmp/protoc /tmp/protoc.zip
	mv /tmp/protoc/bin/protoc /usr/local/bin/protoc

all:
	generate
	build

.PHONY: generate build all