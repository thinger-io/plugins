# SW3L - Flow Sensor

The Dragino SW3L is a LoRaWAN Outdoor Flow Sensor designed for water flow monitoring applications. It detects water flow volume and transmits data to IoT servers via LoRaWAN network. The SW3L sends water flow volume data every 20 minutes and can detect water flow status to send alarms, helping prevent water waste.

## Features

- **LoRaWAN Connectivity**: Long-range wireless communication for outdoor deployment
- **Water Flow Detection**: Monitors and measures water flow volume
- **Multiple Sensor Options**: Available in different pipe diameter configurations
  - SW3L-004: G1/2" / DN15 (450 pulse = 1L)
  - SW3L-006: G3/4" / DN20 (360 pulse = 1L)
  - SW3L-010: G1" / DN25
  - SW3L-020: G2" / DN50
- **Periodic Reporting**: Automatic uplink transmission every 20 minutes
- **Alarm Functionality**: Water flow status detection with alarm capability
- **Outdoor Rating**: IP66 protection level for harsh environments
- **Wide Temperature Range**: Operating temperature from -40°C to +85°C

## Use Cases

- Water usage monitoring and metering
- Leak detection and water waste prevention
- Industrial water flow management
- Agricultural irrigation monitoring
- Smart building water management systems

## Thinger.io Integration

The SW3L Flow Sensor integrates seamlessly with Thinger.io through LoRaWAN network servers, enabling real-time water flow monitoring, data visualization, and alarm management.

## Requirements

A LoRaWAN server is required to communicate the Dragino SW3L into Thinger.io, some options are:

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

- [Product Page](https://www.dragino.com/products/water-meter-flow-sensor/item/222-sw3l.html)
- [Thinger docs](https://docs.thinger.io)