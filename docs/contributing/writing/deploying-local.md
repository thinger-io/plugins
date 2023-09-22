
# Deploying Local Plugins

Plugins can be developed and tested inside Thinger.io Platform, providing an environment before opening a Pull Request against this repository. The only step that Thinger.io does not integrate in itself is the CI system and upload to Docker Hub, so the Docker images should be created locally and uploaded to a users public Docker repository.

To develop a Plugin, follow the steps:

1. Create a [File Storage](https://docs.thinger.io/file-system) with any name.
2. Inside the newly created File Storage, place the neccesary files by following the [Plugin Structure](/contributing/structure/) section.
3. Automatically, Thinger.io Marketplace will fetch the `plugin.json` if it is correctly built.
4. Once tested, upload all files to this repository alonside the documentation.
