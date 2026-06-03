# Intens'O - Current Meter

The WATTECO Intens'O sensor measures the intensity of electric current using its clamp-on ammeter and determines the state of the equipment based on a selectable current threshold. The current magnitude is measured using a current transformer without disrupting the current. The data is then transmitted over a public or private LoRaWAN® radio network.

## Features

- Non-intrusive current measurement using clamp-on current transformer
- Configurable current threshold for equipment state detection
- LoRaWAN connectivity for long-range wireless communication
- Battery-powered with over 10 years autonomy (1-minute measurement intervals)
- IP65 enclosure for indoor and outdoor applications
- Compact design: 82 x 84 x 55 mm
- Operating temperature range: -20°C to 60°C
- 3.6V lithium battery power supply
- Configuration via magnet, NFC, or LoRaWAN downlink
- EU868 frequency support

## Use Cases

- Energy consumption monitoring
- Equipment status detection based on current thresholds
- Electrical load analysis
- Preventive maintenance triggers
- Building automation and energy management
- Industrial equipment monitoring

## Thinger.io Integration

The Intens'O sensor integrates with Thinger.io through LoRaWAN network servers, enabling real-time current monitoring and equipment state tracking within the Thinger.io platform.

## Requirements

A LoRaWAN server is required to communicate the WATTECO Intens'O into Thinger.io, some options are:

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

- [WATTECO Support Portal](https://support.watteco.com/intenso)
- [Thinger docs](https://docs.thinger.io)