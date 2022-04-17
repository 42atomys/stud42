
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

all:
	generate
	build

.PHONY: generate build all