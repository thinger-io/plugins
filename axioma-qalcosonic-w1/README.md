# QALCOSONIC W1 - SMART ULTRASONIC WATER METER

Ultrasonic water meter QALCOSONIC W1 is designed for accurate measurement of cold and hot water consumption in households, apartment buildings and small commercial premises. This maintenance-free device features ultrasonic measurement technology with no moving parts, providing accurate metering with battery lifetime exceeding 16 years.

## Features

- **Ultrasonic measurement technology**: No moving parts, maintenance-free operation
- **High accuracy**: R80 to R800 measurement ratios available (Q3/Q1 ratios: 80, 160, 250, 315, 400, 800)
- **Wide flow range**: Flow sensors from 1.6 m³/h to 25 m³/h (Q3 values)
- **Bi-directional flow measurement**: Measures forward and reverse flow
- **Water temperature monitoring**: Operating range 0.1°C to 90°C
- **IP68 protection class**: Fully submersible and weatherproof
- **Long battery life**: Over 16 years of operation
- **Flexible installation**: Can be installed in any position, no straight pipe run needed
- **Low flow sensitivity**: Starting flow as low as 0.01 gpm
- **9-digit LCD display**: Shows total volume and instantaneous flow rate simultaneously
- **Ambient temperature range**: -15°C to +55°C (Class C / EN 14154)

## Connectivity Options

- **LoRaWAN**: EU868, AS923, AU915, US915 channel plans
- **wM-Bus**: 433 MHz or 868 MHz OMS T1; 868 MHz S1
- **NB-IoT**: CoAP protocol
- **NFC**: For local configuration and readout
- **Optical interface**: Integrated in top panel

## Data Registration

The QALCOSONIC W1 records and stores:

- Total volume
- Forward volume
- Reverse volume
- Maximum flow rate value and date
- Minimum flow rate value and date
- Operating time without error
- Total operating time
- Error codes
- Water temperature indication
- Hourly, daily, and monthly values stored in internal memory

## Alarms and Events

Multiple alarm functions including:

- Flow direction indication
- Battery level indication
- Leakage detection
- Burst detection
- Backflow detection
- Empty pipe detection
- Radio communication status
- Warning indications
- Low temperature warning

## Use Cases

- Residential water consumption metering
- Apartment building submetering
- Small commercial premises monitoring
- Smart city water management systems
- AMI/AMR (Automatic Meter Reading) networks
- Leak detection and water conservation programs

## Compliance

- EN 14154 (Water meters)
- NSF/ANSI/CAN 61
- FCC Part 15C
- NTEP certified
- AWWA C715-18 compliant
- MID 2014/32/EU (Measuring Instruments Directive)

## Thinger.io Integration

The QALCOSONIC W1 integrates with Thinger.io through LoRaWAN connectivity, enabling remote monitoring and management of water consumption data.

## Requirements

A LoRaWAN server is required to communicate the QALCOSONIC W1 into Thinger.io, some options are:

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

Start sending uplinks for autoprovisioning devices and buckets. This product also provides a predefined dashboard and downlinks.

## Additional Resources

QALCOSONIC W1 resources can be found at:

- [Axioma Metering Official Website](https://axiomametering.com)
- [OMS Group Documentation](https://oms-group.org)
- [The Things Network Device Repository](https://www.thethingsnetwork.org/device-repository/devices/axioma/qalcosonic-w1/)
- [Thinger.io Documentation](https://docs.thinger.io)