FROM golang:1.18 AS build

WORKDIR /build
COPY . /build

RUN apt-get update && \
    apt-get install -y unzip && \
    make -f build/Makefile deps generate build

FROM alpine

LABEL maintener "42Atomys <contact@atomys.fr>"
LABEL repository "https://github.com/42Atomys/stud42"

COPY --from=build /build/stud42cli /stud42cli

CMD ["/stud42cli"]