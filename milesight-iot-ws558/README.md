# Milesight WS558 Smart Light Controller

The Milesight WS558 is a LoRaWAN® Smart Light Controller designed for monitoring and controlling lights locally or remotely. With 2 circuit types and 8 switches, it fits different rooms without the need of re-wiring, reducing renovation costs. The device supports both active (LN type) and passive (switch type) outputs, making it versatile for various indoor wiring configurations. Beyond lighting, the WS558 can control fans, heaters, machines, and other electrical equipment. It features local manual control, remote management via web or mobile app, and supports Milesight D2D communication protocol for ultra-low latency control without a gateway.

## Features

- **8-Channel Control**: Controls up to 8 circuits of lights per device
- **Dual Circuit Types**: LN (active outputs) or Switch (passive/dry contact) types available
- **Power Monitoring**: Collects data on current, voltage, power, and electrical consumption for smart energy management
- **Local Control**: Manual switch button control for testing lamp status without network connectivity
- **Long Range**: Ultra-wide-distance wireless transmission up to 15 km line of sight
- **NFC Configuration**: One-touch configuration with NFC support, including card emulation mode
- **Multicast Support**: Control devices in bulk using multicast functionality
- **D2D Protocol**: Supports Milesight Device-to-Device communication for gateway-free operation
- **Maximum Load**: 5A per output, capacitive and inductive load support
- **Operating Temperature**: -20°C to 60°C
- **Dimensions**: 90 x 145 x 40 mm
- **Enclosure Rating**: IP30

## Use Cases

- Smart building lighting control systems
- Office and commercial space automation
- Residential lighting management
- HVAC equipment control (fans, heaters)
- Industrial equipment switching
- Energy monitoring and optimization
- Multi-room lighting coordination

## Thinger.io Integration

The Milesight WS558 integrates with Thinger.io through LoRaWAN connectivity, enabling centralized device management, real-time monitoring of power consumption, and remote control of connected circuits.

## Requirements

A LoRaWAN server is required to communicate the Milesight WS558 into Thinger.io. Compatible options include:

- [The Things Stack](https://www.thethingsindustries.com/stack/)
- [LORIOT](https://loriot.io/)
- [ChirpStack](https://www.chirpstack.io/)

Alongside, the corresponding plugin for the selected LoRaWAN server needs to be installed in your Thinger.io instance.

## Get Started

### Installation

Look for the plugin in the [Thinger.io Plugin Store](https://marketplace.thinger.io/) and install it in your Thinger.io instance. Once the plugin is installed, a new Product will be created for this device.

### Configuration

The Product is already preconfigured. Check that the auto provision prefix matches the one selected in your LoRaWAN server plugin in Thinger.io, or change it to your preference.

### Usage

Start sending uplinks for autoprovisioning devices and buckets. This product provides:

- Automatic device provisioning
- Real-time monitoring of voltage, current, power, and energy consumption
- Remote control of up to 8 switches/circuits
- Predefined dashboards for visualization
- Downlink support for remote switching operations

## Technical Specifications

### LN Type (Active Output)
- **Input Voltage**: 100-250 VAC, 50-60 Hz
- **Output**: 8 active outputs
- **Load Capacity**: Maximum 5A per output

### Switch Type (Passive)
- **Output**: 8 passive switches (dry contact)
- **Load Capacity**: Maximum 5A per output

### Monitoring Capabilities
- Voltage measurement
- Current measurement
- Power consumption
- Energy accumulation

### Connectivity
- **Protocol**: LoRaWAN® (Class A/C)
- **Frequency**: Region-specific (868 MHz / 915 MHz)
- **Range**: Up to 15 km line of sight

### Environmental
- **Operating Temperature**: -20°C to 60°C
- **Enclosure**: IP30

## Additional Resources

Milesight resources can be found at:

- [WS558 User Guide](https://resource.milesight.com/milesight/iot/document/ws558-user-guide-en.pdf)
- [Milesight IoT Documentation](https://www.milesight.com/iot/resources/download-center)
- [Thinger.io Documentation](https://docs.thinger.io)