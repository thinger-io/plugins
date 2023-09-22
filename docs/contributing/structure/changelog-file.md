
# Changelog

Each plugin must have and individual `CHANGELOG.md` file in its plugin directory.

This file will contain any important updates to the plugin version or dependencies, as well as any changes to the file structure, build, deployment or configuration files.

## Versioning

As some plugins are not built by us, and we just take their docker image and generate the necessary plugin files and settings to integrate with Thinger.io, versions would be more understandable if they followed the original software versioning, which most of the times aligns with Semver[^semver], and append the release number of our settings files, leaving plugins versions as follows:

- MAJOR.MINOR.PATCH-CONFIG (i.e.: jupyter/minimal:3.10.5-2)

Meaning, we download version 3.10.5 of jupyter/minimal image and have applied two updates over our integration files.

Our own developed plugins, would be versioned by semver standard[^sermver], so their integration will follow the same rules above described.

For plugins that don't need to follow the original service, or are not based in a third-party service, it is enough with following the Semver[^semver] as `MAJOR.MINOR.PATH` naming.

## Content

For the content of the plugin we propose two different approaches, depending if the plugin is based on another service or if it contains both the services/resources and the integration with Thinger.io. Both of this approaches are based on the Keep a Changelog[^keep-a-changelog] proposal, with minimal adjustments.

### Short Changelog

For the plugins that integrate third-party services and the files included in its directory are keept at a minimum, a short Changelog is enough, containing the version, date and a list of changes to the version.

``` md title="CHANGELOG.md"
# Changelog

All notable changes to InfluxDB2 plugin will be documented here.

### [1.0.1] - 2022-11-17

- Example message

### [1.0.0] - 2022-06-28

- Initial InfluxDB2 plugin

[1.0.0]: https://github.com/thinger-io/plugins/compare/influxdb2/1.0.0...influxdb2/1.0.1
[1.0.0]: https://github.com/thinger-io/plugins/tag/influxdb2/1.0.0
```

An example of this type of Changelog is the [Node-RED Plugin Changelog](https://github.com/thinger-io/plugins/blob/main/node-red/CHANGELOG.md) which is based in a different service developed in-house, found at [node-red-contrib-thinger](https://github.com/thinger-io/Node-RED)

### Extensive Changelog

Plugins that include additional information or developments are required to document any changes, fixed or updates further. For this use case the base Changelog is the one from Keep a Changelog[^keep-a-changelog], without the `Unreleased` section. Below an example:

``` md title="CHANGELOG.md"
# Changelog
All notable changes to this project will be documented in this file.

## [1.1.0] - 2019-02-15

### Added

- Danish translation.
- Changelog inconsistency section in Bad Practices

### Changed

- Fixed typos in Italian translation.

## [1.0.0] - 2017-06-20

### Added

- New visual identity by [@tylerfortune8](https://github.com/tylerfortune8).
- Version navigation.

### Fixed

- Fix Markdown links to tag comparison URL with footnote-style links.

### Removed

- Section about "changelog" vs "CHANGELOG".

[1.1.0]: https://github.com/olivierlacan/keep-a-changelog/compare/1.0.0...1.1.0
[1.0.0]: https://github.com/olivierlacan/keep-a-changelog/releases/tag/1.0.0
```

Of course, anyone is welcome to add their own GitHub alias and URL to their contributions.

[^semver]: [https://semver.org/](https://semver.org/)
[^keep-a-changelog]: [https://keepachangelog.com/en/1.1.0/](https://keepachangelog.com/en/1.1.0/)
