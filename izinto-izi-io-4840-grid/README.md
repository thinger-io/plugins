# izi-io 4840 /grid - I/O Controller

The izinto izi-io 4840 /grid is an industry-strength I/O controller with edge computing and LoRaWAN® connectivity, specially designed for monitoring local power grid transformation substations (Ortsnetzstationen in Germany, 10 kV → 230 V). The device connects to a Jean Müller PLMulti-II measuring device via Modbus/RTU and supports up to 8 additional temperature sensors and switches, providing comprehensive monitoring capabilities for critical power infrastructure.

## Features

- **Powerful Processor**: STM32F446 168 MHz ARM Cortex M4 with 512 kB Flash and 128 kB RAM for edge computing applications
- **LoRaWAN Connectivity**: 433/868 MHz, device class A+B with SMA antenna socket
- **Flexible I/O Configuration**: 8 universal inputs/outputs with individually software-configurable operating modes
- **Modbus/RTU Integration**: Connects to Jean Müller PLMulti-II measuring devices for power grid monitoring
- **Multiple Input Types**: Digital input (24V current sinking type 1 according to IEC61131-1), analog input (4-20 mA), RTD temperature sensors
- **Digital Outputs**: 4 digital half-bridge outputs with 250 mA per output and short-circuit protection
- **Additional Interfaces**: 2x RS-232 or 1x RS-485 or 1x RS-422, CAN bus, Modbus
- **Expandable Storage**: microSD card slot for data logging
- **Visual Feedback**: Multi-color LED display
- **Industrial Design**: Robust construction suitable for substation environments

## Use Cases

- Monitoring of local power grid transformation substations
- Remote supervision of electrical distribution networks
- Temperature monitoring in power infrastructure
- Integration with PLMulti-II measuring devices for comprehensive grid data acquisition
- Critical infrastructure monitoring with edge computing capabilities
- Industrial process control in power distribution environments

## Thinger.io Integration

The izi-io 4840 /grid can be integrated into Thinger.io through LoRaWAN connectivity, enabling remote monitoring and management of power grid substations with real-time data visualization and alerting capabilities.

## Requirements

A LoRaWAN server is required to communicate the izinto izi-io 4840 /grid into Thinger.io. Some options are:

- [The Things Stack](https://www.thethingsindustries.com/stack/)
- [LORIOT](https://loriot.io/)
- [ChirpStack](https://www.chirpstack.io/)

Alongside, the corresponding plugin for the selected LoRaWAN server needs to be installed in your Thinger.io instance.

## Get Started

### Installation

Look for the plugin in the [Thinger.io Plugin Store](https://marketplace.thinger.io/) and install it in your Thinger.io instance. Once the plugin is installed, a new Product will be created for this device.

### Configuration

The Product is already preconfigured. Check that the auto provision prefix matches the one selected in your LoRaWAN server plugin in Thinger.io, or change it to your preference.

Configure the device according to your specific monitoring requirements, including Modbus/RTU settings for PLMulti-II integration and I/O configuration for connected sensors and switches.

### Usage

Start sending uplinks for autoprovisioning devices and buckets. This product provides monitoring capabilities for grid parameters and environmental conditions within substations.

## Additional Resources

Izinto resources can be found at:

- [Product Information](https://www.izinto.online/)
- [Datasheet](https://www.izinto.online/wp-content/uploads/2022/09/izi-io-4840-Data-Sheet-en.pdf)
- [TTN Device Repository](https://www.thethingsnetwork.org/device-repository/devices/izinto/izi-io-4840-grid/)
- [Thinger.io Documentation](https://docs.thinger.io)