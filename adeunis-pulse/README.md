# Pulse - Metering Interface

The Adeunis Pulse impulse interface allows connecting up to 2 connectable meters (water, gas, electricity, etc) and provides LoRaWAN® connectivity. This ready-to-use radio transceiver enables remote monitoring of pulse output meters, periodically reporting meter readings over LoRaWAN networks.

## Features

- **Dual Input Interface**: Supports up to 2 pulse meters simultaneously
- **Universal Compatibility**: Works with water, gas, electricity, and heat meters with pulse output
- **Long Battery Life**: Replaceable lithium battery (4000 mAh) with autonomy up to 10 years
- **Robust Design**: IP68 rated casing for harsh environments
- **LoRaWAN Connectivity**: RF power 14dBm (25mW)
- **Flexible Mounting**: Integrated fastening system for DIN rail, tube, wall mount, or collar installation
- **Compact Form Factor**: 132 x 62 x 34 mm, 103 g

## Technical Specifications

- **Dimensions**: 132 x 62 x 34 mm
- **Weight**: 103 g
- **Enclosure Rating**: IP68
- **Operating Temperature**: -25°C to +70°C (recommended)
- **Battery**: Replaceable 4000 mAh lithium battery
- **Battery Life**: Up to 10 years
- **Frequency Bands**: US902-928 MHz, AS923-1 MHz, AU915-928 MHz, EU868 MHz
- **RF Power**: 14 dBm (25 mW)

## Use Cases

- Remote water meter reading
- Gas consumption monitoring
- Electricity usage tracking
- Heat meter data collection
- Smart building management
- Utility infrastructure monitoring

## Thinger.io Integration

The Adeunis Pulse integrates seamlessly with Thinger.io through LoRaWAN network servers, enabling real-time meter data visualization, historical data storage, and alarm management.

## Requirements

A LoRaWAN server is required to communicate the Adeunis Pulse into Thinger.io, some options are:

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

Adeunis resources can be found at:

- [Product Page](https://www.adeunis.com/en/produit/pulse-impulse-interface)
- [Documentation](https://www.adeunis.com/wp-content/uploads/2019/09/Datasheet_PULSE_AS-US-AU_RC2-4_en.pdf)
- [Thinger docs](https://docs.thinger.io)