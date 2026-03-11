# LWL03A - None-Position Rope Type Water Leak Controller

The Dragino LWL03A is a LoRaWAN None-Position Rope Type Water Leak Controller. User can lay the LWL03A + Water Leak Cable on the ground to detect water leakage. When the rope detects water on the black surface under the yellow rope, the LWL03A will trigger a water leak event and send an uplink to IoT server via LoRaWAN network.

## Features

- LoRaWAN 1.0.3 Class A compliance
- Ultra-low power consumption with 8500mAh Li/SOCI2 battery
- Water leak detection via rope sensor cable
- Frequency bands: 862 ~ 1020 MHz (Band 1 HF), 410 ~ 528 MHz (Band 2 LF)
- Support Bluetooth v5.1 and LoRaWAN remote configuration
- Support wireless OTA firmware updates
- Operating temperature range: -40°C to 85°C
- Max output power: +22 dBm
- RX sensitivity: down to -139 dBm
- Sleep mode current: 5uA @ 3.3V
- LoRa transmit mode: 125mA @ 20dBm, 82mA @ 14dBm
- Battery self-discharge: <1% per year @ 25°C

## Use Cases

- Data centers and server rooms
- Basements and storage facilities
- HVAC systems monitoring
- Industrial facilities
- Museums and conservation environments
- Building maintenance and leak prevention

## Thinger.io Integration

## Requirements

A LoRaWAN server is required to communicate the Dragino LWL03A into Thinger.io, some options are:

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

- [Product Page](https://www.dragino.com/products/lorawan-nb-iot-door-sensor-water-leak/item/241-lwl03a.html)
- [Datasheet](https://media.digikey.com/pdf/Data%20Sheets/Dragino%20PDFs/LWL03A.pdf)
- [Thinger docs](https://docs.thinger.io)