
generate:
	go generate generate.go

build:
	go build -o stud42cli

clean:
	rm -rf internal/api/generated 
	rm -rf internal/models/generated

regenerate: clean generate

all:
	generate
	build

.PHONY: generate build all