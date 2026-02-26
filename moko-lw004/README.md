# LW004 - Panic Button

The LW004 is a LoRaWAN-based panic button with positioning functionality, featuring a compact and smart design that is easy to use. It integrates BLE and GPS technology, making it specially designed for indoor and outdoor positioning of objects or persons. The device combines emergency alert capabilities with location tracking, making it ideal for safety and security applications.

## Features

- **Emergency Alert**: One-button panic alarm activation
- **Dual Positioning**: GPS for outdoor tracking and BLE for indoor positioning
- **Motion Detection**: Built-in accelerometer for movement and vibration detection
- **Light Sensor**: Ambient light detection capability
- **Auxiliary Battery**: Backup power for extended operation
- **Rugged Design**: IP66-rated enclosure for water and dust resistance
- **Compact Form Factor**: 40 x 73 x 17 mm dimensions
- **Wide Operating Temperature**: -20°C to 60°C
- **LoRaWAN Connectivity**: Low-power, long-range wireless communication

## Use Cases

- Personal safety and emergency response systems
- Lone worker protection and monitoring
- Elderly care and medical alert systems
- Asset tracking and security applications
- School and campus safety programs
- Hotel and hospitality guest safety
- Industrial worker safety monitoring

## Thinger.io Integration

The LW004 integrates seamlessly with Thinger.io through LoRaWAN connectivity, enabling real-time emergency alerts, location tracking, and device monitoring through the Thinger.io platform.

To use SOS alerts, you can configure them via the dashboard or as a property.

## Requirements

A LoRaWAN server is required to communicate the LW004 into Thinger.io, some options are:

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

Start sending uplinks for autoprovisioning devices and buckets. This product also provides a predefined dashboard and downlinks.

## Additional Resources

LW004 resources can be found at:

- [Device Repository](https://www.thethingsnetwork.org/device-repository/devices/moko/lw004/)
- [Manufacturer Website](https://www.mokolora.com/)
- [Thinger.io Documentation](https://docs.thinger.io)
