# Toran'O AtEx Zone 1 - I/O Interface

The WATTECO Toran'O AtEx Zone 1 sensor is used to report status changes, pulse count values, and analog measurements of equipment in the AtEx 1 sensitive zone such as water, gas, electricity, or thermal energy meters, mechanical pressure switches, pressure transducers. It makes existing equipment communicate on a public or private LoRaWAN® network.

## Features

- **LoRaWAN® Class A** connectivity
- **3 pulse inputs** for status reporting and counting
- **3 analog inputs**: 2x 0-5V and 1x 4-20mA
- **2 output power sources**: 17Vcc for 4-20mA and 5.5Vcc for 0-5V
- **3 digital inputs** for binary state monitoring
- **IP55 enclosure** for harsh environments
- **AtEx Zone 1 certified** for explosive atmospheres
- Compact design: 92 x 92 x 55.5 mm
- Operating temperature: -20°C to 50°C
- LS17500 3.6V A-type disposable battery
- EU863-870 MHz frequency band

## Use Cases

- Water, gas, and electricity meter monitoring in hazardous zones
- Thermal energy meter data collection
- Mechanical pressure switch status monitoring
- Pressure transducer analog signal transmission
- Industrial equipment monitoring in AtEx Zone 1 environments
- Pulse counting and analog measurement applications in explosive atmospheres

## Thinger.io Integration

The Toran'O AtEx Zone 1 integrates with Thinger.io through LoRaWAN network servers, enabling remote monitoring of analog inputs, digital states, and pulse counters from equipment in hazardous locations.

## Requirements

A LoRaWAN server is required to communicate the Toran'O AtEx Zone 1 into Thinger.io, some options are:

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

- [WATTECO Support Portal](https://support.watteco.com/toranoatexzone1)
- [Thinger docs](https://docs.thinger.io)