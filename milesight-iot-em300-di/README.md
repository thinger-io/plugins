# EM300-DI - Pulse Counter

The EM300-DI LoRaWAN® Pulse Counter is used to remotely read metering data from water meters. It turns existing traditional water meters into smart meters via LoRaWAN® network which further enables easier management and increases the efficiency of water use. The device is compact and features an IP67 waterproof enclosure, making it suitable for harsh environment applications with ultra-wide-distance transmission up to 10 km line of sight.

## Features

- **Pulse Counting**: Flexible counting configuration to enable, stop, and clear accumulated values
- **Digital Filtering**: Filters interference signals to ensure more accurate counters
- **Water Monitoring**: Calculate water consumption and send water flow/outage alarms
- **Environmental Sensors**: Embedded temperature and humidity sensors for environment monitoring
- **Long Range**: Ultra-wide-distance transmission up to 10 km line of sight
- **Data Reliability**: Store historical records and support retransmission to prevent data loss
- **D2D Protocol**: Support Milesight D2D protocol for ultra-low latency and direct control without gateways
- **Long Battery Life**: Built-in 4000 mAh replaceable battery with up to 5 years of operation
- **Durable Design**: IP67 waterproof enclosure for outdoor and harsh environment applications

## Specifications

- **Wireless Technology**: LoRaWAN®
- **Sensors**: Pulse count, battery, temperature, humidity
- **Enclosure**: IP67 waterproof
- **Dimensions**: 88 x 27 x 87 mm
- **Cable Length**: 1 m (customizable)
- **Operating Temperature**: -30°C to +70°C
- **Temperature Accuracy**: ±0.3°C (0°C to 70°C), ±0.6°C (-30°C to 0°C)
- **Battery**: 4000 mAh replaceable, up to 5 years battery life

## Use Cases

- Water meter monitoring and smart water management
- Remote metering for utilities
- Water consumption tracking and billing
- Leak detection and water flow monitoring
- Water outage alarm systems
- Traditional meter retrofitting for IoT integration

## Thinger.io Integration

The EM300-DI integrates seamlessly with Thinger.io through LoRaWAN network servers, enabling real-time monitoring of pulse counts, water consumption, temperature, humidity, and battery status. The device supports automatic provisioning and data visualization through Thinger.io dashboards.

## Requirements

A LoRaWAN server is required to communicate the EM300-DI into Thinger.io, some options are:

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
This product also provides a predefined dashboard for monitoring pulse counts, water consumption, temperature, humidity, and battery levels.

## Additional Resources

Milesight resources can be found at:

- [EM300-DI Datasheet](https://resource.milesight.com/milesight/iot/document/em300-di-datasheet-en.pdf)
- [Device Repository](https://www.thethingsnetwork.org/device-repository/devices/milesight-iot/em300-di/)
- [Thinger.io Documentation](https://docs.thinger.io)