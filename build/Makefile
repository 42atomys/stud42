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

local-dev-setup: deps generate certs
	docker-compose -f docker-compose.local.yaml up -d
	docker exec -it s42_postgres psql -c 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; CREATE EXTENSION IF NOT EXISTS "pg_trgm";' -U postgres -d s42

all:
	deps
	generate
	build

.PHONY: certs clean deps generate build all