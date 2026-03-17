# CPL01 - Dry Contact Sensor

The Dragino CPL01 is a LoRaWAN Contact Sensor designed for outdoor use. It detects open/close status and uplinks to IoT server via LoRaWAN network. Users can monitor the dry contact status, open time, and open counts in the IoT Server. The CPL01 features an open alarm capability, allowing users to configure the device to send an alert if the contact has been open for a specified duration.

The CPL01 sends periodic data transmissions daily as well as event-driven messages for each dry contact action. It counts contact open occurrences and calculates the last open duration, making it suitable for monitoring gates, cabinets, doors, and other mechanical switches.

## Features

- **LoRaWAN Class A Protocol**: Standard LoRaWAN compliance for low-power operation
- **IP66 Protection**: Weatherproof enclosure suitable for outdoor installation
- **Long Battery Life**: 8500 mAh Li-SOCl₂ industrial non-rechargeable battery with up to 10 years lifespan
- **Multi-Band Support**: Available frequency bands include EU868, EU433, US915, CN470, AS923, IN865, KR920, and AU915
- **High Sensitivity**: LoRa sensitivity up to -137 dBm (SF12)
- **TX Power**: Up to 14 dBm transmission power
- **Event Counting**: Tracks open/close events and duration statistics
- **Configurable Alarms**: Customizable open time alarm notifications

## Use Cases

- Door and window monitoring
- Gate status detection
- Cabinet and enclosure security
- Industrial equipment monitoring
- Water leak detection (with appropriate contact sensor)
- Access control systems
- Building automation and security

## Thinger.io Integration

The CPL01 integrates seamlessly with Thinger.io through LoRaWAN network servers, enabling real-time monitoring of contact status, event counting, and alarm management through the platform's intuitive interface.

## Requirements

A LoRaWAN server is required to communicate the Dragino CPL01 into Thinger.io, some options are:

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

- [Product Page](https://www.dragino.com/products/lorawan-nb-iot-door-sensor-water-leak/item/205-cpl01.html)
- [Thinger docs](https://docs.thinger.io)