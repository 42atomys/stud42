# S42 Packages

S42 have dependencies and in some case needs to have specific docker build.
This folder regroups all dockerfile updated and/or modified by project.

## Package Dockerfile

A Dockerfile package must be writen with the context based on her folder.
When you need to add file (with `COPY` directive, for example), you need to add 
this file to the package folder and copy it from this location. Prevent import
project relative file on any package.

Dockerfile base image can receive a build_arg called `PACKAGE_VERSION` to
pull the base image tag from this variable. See the example below 

```Dockerfile
ARG PACKAGE_VERSION=1.2.3
FROM image:${PACKAGE_VERSION}

```

## Folder architecture

The following folder architecture MUST BE respected
```
build/
  packages/
    {name}/
      Dockerfile
      ... others files
```

## Build the image 

After adding your `Dockerfile`, add relative files and test the build on local, 
add the `{name}` to the file `.github/workflows/packages.yaml` on the `matrix`
directive. 

```yaml
strategy:
  matrix:
    include:
    - package: name
      version: 1.2.3
```

After the success of the merge into the main branch, the CI will automatically
pick up the build and make the image available with
`docker pull ghcr.io/42atomys/s42-{name}:{version}`
(with `{name}` and `{version}` defined above in the workflow file)