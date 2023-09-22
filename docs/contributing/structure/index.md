
# Plugin Structure

In this monorepo, each plugin has its own folder with the name of its id, which contains all neccesary files to publish new plugins to [Thinger.io](https://thinger.io) Platform.

## Necessary files

Each plugins must contain at least the following files:

- [Plugin file](plugin-file)
- [Readme](readme-file)
- [Changelog](changelog-file)

In each one of the above links you'll find more information regarding the type, standard and content of each file.

## Optional files
The optional files are subject to the way in which the plugin is built, deployed and launched. Therefore, this sections contains just some examples that the plugins may include.

Some of the optional files could be:

- [Dockerfile](dockerfile)
- [Configuration files](configuration-files)

Of course, every plugin is different, so the optional files are not limited to the above types, and anything may be added as long as it it neccesary and is handled by either the build, deployment or execution of the plugin.
