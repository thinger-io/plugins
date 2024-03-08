# Changelog

## [1.2.0] - 2024-03-08

### Added

- Support for autoprovision device and bucket separately
- Support for configuring a preexisting bucket for device write callback
 
### Security

- Updated axios to version 1.6.7
- Updated express to version 4.18.2
- Updated vm2 to version 3.9.19

## [1.1.0] - 2024-02-06

### Added

- Support for setting Project and Product on auto-provisioned devices & buckets
- f\_port of downlink may be configured by sending it in the downlink body

## [1.0.4] - 2023-02-21

### Fixed

- Ensure provided device type is available instead of using default settings

## [1.0.3] - 2023-02-20

### Fixed

- Make sure Thinger server is running before starting service

[1.2.0]: https://github.com/thinger-io/plugins/compare/ttn-stack/v1.2.0...ttn-stack/v1.2.0
[1.1.0]: https://github.com/thinger-io/plugins/compare/ttn-stack/v1.0.4...ttn-stack/v1.1.0
[1.0.4]: https://github.com/thinger-io/plugins/compare/ttn-stack/v1.0.3...ttn-stack/v1.0.4
[1.0.3]: https://github.com/thinger-io/plugins/tree/ttn-stack/v1.0.3
