# LW005 - Smart Plug

The LW005 is a compact, multi-purpose, easy-to-use wireless LoRaWAN power meter designed for indoor use. It enables remote control of the output switch and real-time monitoring of power consumption and energy usage. The device supports wide-range voltage input (100-240VAC, 50/60Hz) and is available in multiple plug types including UK, US, FR, and EU configurations.

## Features

- LoRaWAN Class A & Class C compatible
- Remote ON/OFF switch control via LoRaWAN downlink commands
- Real-time power and energy consumption monitoring
- Wide voltage input range: 100-240VAC, 50/60Hz
- Power measurement accuracy: 0.5%
- Physical button for manual ON/OFF control
- Bluetooth 4.0 support for initial configuration via MKLoRa APP
- Regular status reporting
- Operating temperature: -20°C to 40°C
- Compact dimensions: 104 x 61 x 34 mm
- Multiple plug type options (UK/US/FR/EU)

## Sensors & Measurements

- **Power**: Active power consumption
- **Energy**: Cumulative energy usage
- **Voltage**: AC voltage monitoring
- **Button**: Physical switch status
- **Light**: Device status indicator

## Use Cases

- Smart home energy monitoring
- Remote appliance control
- Energy consumption analysis
- Building automation systems
- Industrial equipment monitoring
- Smart office power management

## Thinger.io Integration

The LW005 Smart Plug integrates seamlessly with Thinger.io through LoRaWAN network servers, enabling remote monitoring and control of connected devices with real-time power consumption data visualization.

## Requirements

A LoRaWAN server is required to communicate the LW005 Smart Plug into Thinger.io, some options are:

- [The Things Stack](https://www.thethingsindustries.com/stack/)
- [LORIOT](https://loriot.io/)
- [ChirpStack](https://www.chirpstack.io/)

Alongside, the corresponding plugin for the selected LoRaWAN server needs to be installed in your Thinger.io instance.

## Get Started

### Installation

Look for the plugin in the [Thinger.io Plugin Store](https://marketplace.thinger.io/) and install it in your Thinger.io instance. Once the plugin is installed a new Product will be created for this device.

### Configuration

The Product is already preconfigured, check that the auto provision prefix matches the one selected in your LoRaWAN server plugin in Thinger.io, or change it to your desire.

Use the MKLoRa APP via Bluetooth to configure the device with the necessary LoRaWAN network credentials (DevEUI, AppEUI, AppKey) before deployment.

### Usage

Start sending uplinks for autoprovisioning devices and buckets. This product also provides predefined dashboards for power monitoring and downlinks for remote switch control.

## Additional Resources

MOKO resources can be found at:

- [Product Page](https://www.mokolora.com/lorawan-meter-plug-lw005-mp/)
- [Device Repository](https://www.thethingsnetwork.org/device-repository/devices/moko/lw005-mp/)
- [Thinger docs](https://docs.thinger.io)