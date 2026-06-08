# Tics'O

The Tics'O sensor enables data transfer from the TIC output of ENEDIS electronic electricity meters to a remote server using the LoRaWAN® communication protocol. The Tics'O sensor transforms ENEDIS meters into Internet-connected objects (IoT), allowing remote monitoring and management of energy consumption data.

## Features

- **LoRaWAN® Class A** connectivity for long-range communication
- **Automatic meter recognition** - Detects ENEDIS meter type and adapts communication speed (1,200 to 19,600 Bauds)
- **DIN rail mounting** - 1U standard rail installation for easy deployment
- **External RF antenna** - Can be remotely positioned for optimal signal reception
- **Dual power supply options** - 230VAC mains supply or continuous 3.6V DC
- **Linky compatibility** - Compatible with modulated power supply from Linky meters (I1, I2, A)
- **TIC protocol support** - Decodes and analyzes all fields from the Teleinfo Customer Interface
- **Plug-and-play installation** - Simplified deployment and use

## Use Cases

- Remote electricity meter reading
- Energy consumption monitoring and analysis
- Smart building and facility management
- Utility billing automation
- Energy efficiency programs
- Multi-site energy management

## Thinger.io Integration

The Tics'O sensor can be integrated with Thinger.io to visualize and manage energy consumption data from ENEDIS electricity meters.

## Requirements

A LoRaWAN server is required to communicate the Tics'O into Thinger.io, some options are:

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
This product also provides a predefined dashboard for monitoring energy consumption metrics from your ENEDIS meters.

## Additional Resources

Watteco resources can be found at:

- [Watteco Official Website](https://www.watteco.fr/)
- [Watteco TIC Support](https://support.watteco.com/tic)
- [Thinger.io Documentation](https://docs.thinger.io)