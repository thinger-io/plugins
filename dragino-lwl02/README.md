# LWL02 - Water Leak Sensor

The Dragino LWL02 is a LoRaWAN Water Leak Sensor designed to detect water presence and trigger alerts via the LoRaWAN network. When water is detected between the two metal probes, the LWL02 immediately indicates a water leak event and sends an uplink to the IoT server. The device sends periodic data transmissions as well as event-triggered uplinks for each water leak detection. Users can configure the device to count events and uplink periodically instead of sending immediate alerts for each occurrence.

## Features

- **LoRaWAN v1.0.3 Class A** compliance
- **SX1262 LoRa Core** radio module
- **Event-triggered uplinks** on water leak detection
- **Periodic data transmission** (configurable intervals)
- **Battery-powered operation** with 2 x AAA LR03 alkaline batteries
- **Long battery life** of 2-10 years depending on transmission frequency
- **Compact design** with dimensions of 69.2 x 29.2 x 15 mm
- **Multi-frequency band support** including EU433, CN470, IN865, AS923, AU915, and US915
- **Configurable event counting** mode for reduced uplink frequency
- **Wide operating temperature range** (-10°C to 50°C with standard batteries, -40°C to 60°C with special batteries)

## Use Cases

- Water leak detection in server rooms and data centers
- Flood monitoring in basements and storage areas
- Pipeline and plumbing leak detection
- Industrial facility water damage prevention
- Museum and archive environmental monitoring
- Smart building water management systems

## Thinger.io Integration

The LWL02 integrates with Thinger.io through a LoRaWAN network server, enabling real-time monitoring and alerting for water leak events.

## Requirements

A LoRaWAN server is required to communicate the Dragino LWL02 into Thinger.io, some options are:

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

Dragino resources can be found at:

- [Product Page](https://www.dragino.com/products/lorawan-nb-iot-door-sensor-water-leak/item/180-lwl02.html)
- [Thinger.io Documentation](https://docs.thinger.io)