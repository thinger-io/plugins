# Pulse Sens'O AtEx Zone 1 - Smart Meter Interface

The WATTECO LoRaWAN® Pulse Sens'O AtEx Zone 1 has a pulse sensor for reading meter data from water, gas (such as Itron, Esther, and Gazpar), or electricity in AtEx zone 1 sensitive areas. It also includes digital input and voltage sensors. This LoRaWAN Class A sensor allows remote monitoring of metering data from pulse outputs of utility meters in potentially explosive atmospheres.

## Features

- **Pulse Counter**: Remote reading of metering data from pulse output
- **Digital Input**: Electronic input for monitoring external signals
- **Voltage Sensor**: Input voltage measurement (0-25Vcc)
- **AtEx Zone 1 Certified**: Designed for use in sensitive and potentially explosive areas
- **LoRaWAN Connectivity**: Class A device for long-range, low-power communication
- **Durable Design**: IP55 enclosure rating for protection against dust and water

## Technical Specifications

- **Sensors**: Pulse count, digital input, voltage
- **Electronic Input**:
  - Impedance: > 1MΩ
  - Voltage Range: 0-25Vcc
  - Delivered Current: 3.5µA
  - Maximum Frequency Signal: 0-100Hz per input
- **Power Supply**: Disposable LS17500 3.6V A-type battery (SAFT type LS17500)
- **Enclosure**: IP55
- **Dimensions**: 92 x 92 x 55.5 mm
- **Operating Temperature**: -20°C to 50°C
- **LoRaWAN Class**: A

## Use Cases

- Utility metering in hazardous locations (water, gas, electricity, heat)
- Industrial facility monitoring in AtEx zone 1 areas
- Remote meter reading in oil and gas installations
- Energy consumption tracking in chemical plants
- Monitoring of meters compatible with Itron, Esther, and Gazpar standards

## Thinger.io Integration

The Pulse Sens'O AtEx Zone 1 integrates with Thinger.io through a LoRaWAN network server, enabling remote monitoring and management of meter data from sensitive areas.

## Requirements

A LoRaWAN server is required to communicate the WATTECO Pulse Sens'O AtEx Zone 1 into Thinger.io, some options are:

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

Start sending uplinks for autoprovisioning devices and buckets. This product also provides a predefined dashboard for monitoring pulse counts, digital inputs, and voltage measurements from meters in AtEx zone 1 environments.

## Additional Resources

WATTECO resources can be found at:

- [Official Support](https://support.watteco.com/pulsesensoatexzone1)
- [Datasheet](https://www.m2mgermany.de/shop/media/webshop_dl/NKE%20Watteco/8989_WATTECO_DS_50-70-123_152_228_PulseSENSO_AtEx_zone1_1.8.pdf)
- [Thinger.io Documentation](https://docs.thinger.io)