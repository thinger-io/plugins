# Press'O - Analog Interface

The WATTECO Press'O sensor turns any 0-10V, 4-20mA analog gauge into a Class A sensor connected to a public or private LoRaWAN® network that allows the monitoring, measurement, and remote reading of any fluid level (water, oil, gas, etc).

## Features

- LoRaWAN® Class A device
- 0-10V and 4-20mA analog input interfaces
- Selector switch for analog input type selection
- Data compression for batch reporting
- Power supply capability for connected gauges
- Battery operation or external power supply
- Up to 5 years battery autonomy
- IP55 enclosure protection
- Operating temperature: -20°C to 50°C
- Dimensions: 92 x 92 x 56 mm
- RoHS, CE, and FCC compliant

## Use Cases

- **Water Resource Management**: Monitor and measure water level in water towers, water tanks, rainwater tanks, groundwater, and retention ponds
- **Building Management**: Monitor and measure fluid levels in buried oil tanks, aboveground oil tanks, and gas tanks
- **Smart Metering**: Remote monitoring and measurement of various fluid levels
- **Industrial Applications**: Transform existing analog sensors into wireless LoRaWAN devices

## Thinger.io Integration

The Press'O sensor integrates with Thinger.io through LoRaWAN connectivity, enabling remote monitoring and data visualization of analog sensor measurements.

## Requirements

A LoRaWAN server is required to communicate the WATTECO Press'O into Thinger.io, some options are:

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

- [Product Support](https://support.watteco.com/presso-2)
- [Device Repository](https://www.thethingsnetwork.org/device-repository/devices/nke-watteco/presso-sensor)
- [Thinger docs](https://docs.thinger.io)