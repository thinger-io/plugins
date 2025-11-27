# Teltonika Eye

The Teltonika Eye Plugin for Thinger.io enables the integration of Teltonika's Eye devices, Beacon and Sensor, with the Thinger.io Platform.

## Thinger.io and Teltonika Eye Integration

Monitor and track your fleet within Thinger.io

## Requirements

The Teltonika Telematics Plugin needs to be installed in the Platform, as the telematics devices will send the data of the Teltonika Eye to the Thinger.io Platform.

The Teltonika Eye may be configured to send beacons in Eddystone or iBeacon protocols.

## Get Started

### Installation

First install this plugin through the Plugin Management Interface. More information [here](https://marketplace.thinger.io/plugins/managing/#install-and-deploy-an-existent-plugin).

### Configuration

It is required to enable the Teltonika Eye endpoint within Thinger.io so as the Telematics devices can send the received Eye data. Go into the Teltonika Telematics product and enable the `teltonika_eye` endpoint.

The Teltonika Eye Product, has an autoprovision feature, disabled by default, that will autoprovision in the platform the received BLE beacons, however the Telematics device may receive beacons from non Teltonika devices, and autoprovision other kind of devices.
The devices can be manually provisioned by the Eddystone or iBeacon ids.

### Usage

Detail how to use the plugin after configuration. Include examples, best practices, and troubleshooting tips.

## Additional Resources

Provide any additional resources, documents, or links to external sites that can help users understand or utilize the plugin better.

- [Teltonika Eye Beacon Documentation](https://wiki.teltonika-gps.com/view/EYE_BEACON_/_BTSID1)
- [Teltonika Eye Beacon Configuration](https://wiki.teltonika-gps.com/view/Configuring_EYE_beacons)
- [Teltonika Eye Beacon Get Started](https://wiki.teltonika-gps.com/view/How_to_start_with_FMB_devices_and_Beacons%3F)
- [Start with FMB devices and Beacons](https://wiki.teltonika-gps.com/view/How_to_start_with_FMB_devices_and_Beacons%3F)
- [Teltonika Support Forum](https://community.teltonika.lt/)
- [Thinger.io Community](https://community.thinger.io/)

## FAQ

Include a section for frequently asked questions to address common issues or queries.
