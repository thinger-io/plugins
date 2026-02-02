# XBee-LR

The Digi XBee LR is a pre-integrated and certified wireless communications module that enables LoRaWAN protocol for device-to-cloud connectivity. This software-defined radio module features multi-region support, allowing seamless deployment across global networks with a single SKU. The module is designed for OEMs to easily incorporate into end-node sensor products, offering modular certifications for FCC, IC, and CE standards.

The XBee-LR MMT variant features a U.FL antenna connector and supports zero-touch provisioning through Digi X-ON cloud service, enabling remote device configuration and maintenance. Configuration is managed through XBee Studio software for LoRaWAN settings.

## Key Features

- **Multi-region support**: Single SKU supporting US915, EU868, AS923, and additional global frequency bands
- **Pre-certified**: Modular certifications for FCC, IC, and CE standards
- **LoRaWAN compatible**: Supports low-power, long-range wide area networking protocol
- **Ultra-low power consumption**: 600nA in sleep mode
- **Transmit power**: Up to +21dBm (US), +14dBm (EU), software selectable
- **Frequency range**: ISM 902-928MHz (US), 868-870MHz (EU)
- **Zero-touch provisioning**: X-ON cloud integration for remote provisioning and maintenance
- **Form factor**: MMT footprint with U.FL antenna connector
- **Operating temperature**: -40°C to +85°C
- **Configuration tool**: XBee Studio for LoRaWAN parameter setup

## Thinger.io Integration

The XBee-LR integrates with Thinger.io through LoRaWAN network servers, enabling secure device-to-cloud connectivity for IoT applications. The module's software-defined radio architecture allows flexible deployment across different regions while maintaining consistent cloud integration capabilities.

## Requirements

A LoRaWAN server is required to communicate the Digi XBee-LR into Thinger.io, some options are:

- [The Things Stack](https://www.thethingsindustries.com/stack/)
- [LORIOT](https://loriot.io/)
- [ChirpStack](https://www.chirpstack.io/)

Alongside, the corresponding plugin for the selected LoRaWAN server needs to be installed in your Thinger.io instance.

Additionally, you will need:

- **XBee Studio**: For configuring LoRaWAN settings on the module
- **Digi X-ON account**: Optional, for zero-touch provisioning and remote management

## Get Started

### Installation

Look for the plugin in the [Thinger.io Plugin Store](https://marketplace.thinger.io/) and install it in your Thinger.io instance. Once the plugin is installed a new Product will be created for this device.

### Configuration

1. Configure the XBee-LR module using XBee Studio:
   - Set the appropriate regional frequency band (US915, EU868, AS923, etc.)
   - Configure LoRaWAN credentials (DevEUI, AppEUI, AppKey for OTAA or DevAddr, NwkSKey, AppSKey for ABP)
   - Set transmit power and data rate parameters as needed

2. Register the device in your LoRaWAN network server with the configured credentials

3. In Thinger.io, verify that the Product auto-provision prefix matches the one selected in your LoRaWAN server plugin, or adjust it to your preference

### Usage

Start sending uplinks for autoprovisioning devices and buckets. The XBee-LR module will automatically join the LoRaWAN network and begin transmitting data to Thinger.io through your network server integration.

## Additional Resources

Digi XBee resources can be found at:

- [Digi XBee LR Product Page](https://www.digi.com/products/embedded-systems/digi-x-on/digi-xbee-lr-for-lorawan)
- [Digi XBee LR Datasheet](https://www.digi.com/resources/library/data-sheets/digi-xbee-lr-datasheet)
- [XBee Studio Configuration Tool](https://www.digi.com/products/embedded-systems/digi-xbee-tools/xbee-studio)
- [Thinger.io Documentation](https://docs.thinger.io)