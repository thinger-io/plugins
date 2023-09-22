# HTTP Devices

<p align="center">
  <img src="/plugins/http-device/assets/http-device-logo.png" onerror="this.src='https://marketplace.thinger.io/plugins/http-device/assets/http-device-logo.png';this.onerror='';" width="200" alt="Thinger.io web console with VS Code plugin and OTA upload">
</p>

This plugin is specially useful for fleets of generic devices that can make HTTP requests.

In a single HTTP request done by the device, this plugin can auto-provision the device and the data bucket if it does not exist. Moreover, it allows processing request/response payloads to process the information before it is stored in the data bucket, or before it is received by the device.

## Plugin features

* Support for multiple device types or profiles
* Automatic device and bucket provisioning for new devices.
* Configurable default device timeout.
* Configurable device and bucket prefixes.
* Configurable device and bucket asset type and group.
* Support por defining custom request/response data processing on NodeJS.
* Payload Processing workbench.
