FROM golang:1.17-alpine AS build

WORKDIR /build
COPY . /build
RUN CGO_ENABLED=0 GOARCH=amd64 GOOS=linux go build -o stud42

FROM alpine

LABEL maintener "42Atomys <contact@atomys.fr>"
LABEL repository "https://github.com/42Atomys/stud42"

COPY --from=build /build/stud42 /stud42

CMD ["/stud42"]