# JWTKS Service

### Start without DEVENV like a boss (TODO)

1. Generate Certificate with `make -f build/Makefile certs`
2. Edit your configuration file `config/stud42.yaml` to add JWTKS Service part with your path to certificates
```yaml
# jwtks service relatives configurations
jwtks:
  certs:
    private_key: /home/you/devbox/stud42/certs/private.key
    public_key: /home/you/devbox/stud42/certs/public.pem
```
3. Generate the GRPC code with `go generate cmd/jwtks.go`
4. Enjoy.