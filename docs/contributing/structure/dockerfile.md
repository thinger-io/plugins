
# Dockerfile

With Dockerfiles, we can describe the way in which to build a Plugin, that will then be available on the platform.

This Dockerfiles must be placed inside a directory called `task`. There a currently no limits in what this Dockerfiles should contain, nevertheless they should be as independent and minimal as possible.

Also, the `task` directory must contain every file necessary to build the Docker image. Once built, the image will then be uploaded to [Docker Hub](https://hub.docker.com/u/thinger) by the CI system integrated in GitHub, so no further steps need to be taken by the developer apart from testing locally and in a development branch before merging into master.

There are multiple examples within Thinger.io Plugins that are built this way, checkout out [Node-RED Plugin](https://github.com/thinger-io/plugins/tree/main/node-red) and [TTN Stack Plugin](https://github.com/thinger-io/plugins/tree/main/ttn-stack).
