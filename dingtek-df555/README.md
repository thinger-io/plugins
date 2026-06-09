# DF555 - Ultrasonic Tank Level Sensor

The CNDingtek DF555 is an ultrasonic level sensor for various types of tanks, which is installed on top of the tank. It provides non-contact measurement for liquid and solid level monitoring with wireless LoRaWAN connectivity, suitable for both open and closed containers with a measurement range of up to 5 meters.

## Key Features

- **Non-contact ultrasonic measurement** up to 5 meters range
- **LoRaWAN wireless connectivity** with global frequency band support
- **IP67 waterproof** rating for harsh environments
- **Low power consumption** with battery or DC power options
- **Dual mounting options**: threaded or screw mounting
- **Temperature range**: -20°C to 70°C operating temperature
- **Integrated sensors**: level, GPS, and temperature
- **ATEX certified** version available (II 0 G Ex ia IIC T6 Ga)
- **Compact design**: 95mm diameter, 123mm height

## Thinger.io Integration

The DF555 integrates seamlessly with Thinger.io through LoRaWAN network servers, enabling remote monitoring of tank levels with real-time data visualization and alerts.

## Requirements

A LoRaWAN server is required to communicate the CNDingtek DF555 into Thinger.io, some options are:

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

## Use Cases

- Industrial tank level monitoring
- Water and wastewater management
- Chemical storage monitoring
- Fuel tank level detection
- Silo and hopper monitoring
- Agricultural storage management

## Additional Resources

CNDingtek resources can be found at:

- [Official Website](https://www.dingtek.com)
- [Product Page](https://www.dingtek.com/top-installation-level-sensor-df555)
- [Device Repository](https://www.thethingsnetwork.org/device-repository/devices/dingtek/df555)
- [Thinger docs](https://docs.thinger.io)