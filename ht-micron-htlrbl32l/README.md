# HTLRBL32L LoRa + BLE SiP

The iMCP HTLRBL32L is a highly compact and low-power wireless communication device featuring LoRa® and Bluetooth® Low Energy capabilities. In a tiny 13x13x1.1 mm package it allows easy development of solutions for both long and short ranges, whilst requiring minimum power consumption enabling years-long battery life applications. Designed and manufactured in Brazil, this System-in-Package (SiP) transforms the integration and prototyping of long and short range IoT solutions.

## Features

- **Dual Communication Protocol**: LoRa® and Bluetooth® Low Energy
- **Ultra-compact Form Factor**: 13x13x1.1 mm package
- **Low Power Consumption**: Optimized for battery-powered applications with years-long battery life
- **System-in-Package (SiP)**: Fully integrated solution for rapid prototyping and deployment
- **Long and Short Range Connectivity**: Enables hybrid IoT applications

## Use Cases

- Smart city infrastructure
- Industrial IoT monitoring
- Asset tracking and logistics
- Environmental sensing
- Remote data collection with local connectivity
- Battery-powered sensor networks

## Thinger.io Integration

The HTLRBL32L can be integrated into Thinger.io through its LoRaWAN connectivity, enabling seamless device management, data visualization, and remote control capabilities.

## Requirements

A LoRaWAN server is required to communicate the HTLRBL32L into Thinger.io, some options are:

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

HTLRBL32L resources can be found at:

- [GitHub Repository](https://github.com/htmicron/htlrbl32l)
- [HT Micron Product Page](https://www.st.com/en/partner-products-and-services/htlrbl32l-lora-plus-ble-sip.html)
- [Datasheet](https://media.digikey.com/pdf/Data%20Sheets/HT%20Micron%20PDFs/HTLRBL32L.pdf)
- [Thinger.io Documentation](https://docs.thinger.io)