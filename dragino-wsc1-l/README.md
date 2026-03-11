# WSC1-L - Weather Station Process Unit

The WSC1-L is the main process unit in Dragino Weather Station solution. It functions as a LoRaWAN RS485 end-node designed for outdoor deployment that reads values from various sensors and uploads sensor data to IoT servers via LoRaWAN wireless protocol. The WSC1-L is powered by external 12V solar power with a Li-ion backup battery, making it suitable for remote weather monitoring installations.

The device is fully compatible with LoRaWAN Class A protocol and works with standard LoRaWAN gateways. It supports integration with multiple Dragino weather sensors including rain gauges, temperature/humidity/pressure sensors, wind speed and direction sensors, and other environmental monitoring devices through RS485 interface.

## Thinger.io Integration

## Requirements

A LoRaWAN server is required to communicate the Dragino WSC1-L into Thinger.io, some options are:

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

- [Documentation](https://www.dragino.com/products/lorawan-nb-iot-door-sensor-water-leak/item/232-wsc1-l.html)
- [Thinger docs](https://docs.thinger.io)