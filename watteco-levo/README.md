# Lev'O+ - Pressure Sensor Probe

The WATTECO Lev'O+ is a LoRaWAN® pressure sensor probe designed for measuring liquid levels in tanks, cisterns, and cavities. It monitors water, fuel, oil, fertilizer, and other liquids, providing accurate level measurement for industrial, logistics, and smart metering applications. An ATEX-specific probe is available separately for use in explosive environments.

## Features

- **LoRaWAN Class A** connectivity
- **Pressure level sensor** for liquid measurement
- **4-20mA pressure probe** integration
- **Internal battery** for autonomous operation
- **Internal antenna** for simplified installation
- **IP65 enclosure** for environmental protection
- **Operating temperature range**: -20°C to 55°C
- **Compact dimensions**: 82 x 84 x 55 mm
- **ATEX-compatible probe** option for Zone 1 hazardous areas

## Use Cases

- Tank level monitoring (water, fuel, oil, chemicals)
- Industrial liquid storage management
- Smart metering and utility monitoring
- Agricultural applications (fertilizer, irrigation systems)
- Logistics and supply chain monitoring
- Cistern and cavity level tracking

## Thinger.io Integration

The Lev'O+ integrates seamlessly with Thinger.io through LoRaWAN network servers, enabling remote monitoring, data visualization, and alerts for liquid level management.

## Requirements

A LoRaWAN server is required to communicate the WATTECO Lev'O+ into Thinger.io, some options are:

- [The Things Stack](https://www.thethingsindustries.com/stack/)
- [LORIOT](https://loriot.io/)
- [ChirpStack](https://www.chirpstack.io/)

Alongside, the corresponding plugin for the selected LoRaWAN server needs to be installed in your Thinger.io instance.

## Get Started

### Installation

Look for the plugin in the [Thinger.io Plugin Store](https://marketplace.thinger.io/) and install it in your Thinger.io instance. Once the plugin is installed a new Product will be created for this device.

### Configuration

The Product is already preconfigured, check that the auto provision prefix matches the one selected in your LoRaWAN server plugin in Thinger.io, or change it to your desire.

### Usage

Start sending uplinks for autoprovisioning devices and buckets.
This product also provides a predefined dashboard and downlinks.

## Additional Resources

WATTECO resources can be found at:

- [Documentation](https://support.watteco.com/levo)
- [Thinger docs](https://docs.thinger.io)