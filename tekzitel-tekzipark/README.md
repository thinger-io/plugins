# TEKZIPARK LoRaWAN Parking Sensor

The TEKZITEL TEKZIPARK is a smart parking sensor that uses radar technology to detect vehicle presence in parking spaces. It enables real-time occupancy status updates wirelessly to cloud environments through a LoRaWAN® network, facilitating efficient parking space management and optimization.

## Thinger.io Integration

This product profile enables seamless integration of TEKZIPARK sensors with Thinger.io, providing automated device provisioning, real-time parking occupancy monitoring, and historical data storage for parking analytics.

## Requirements

A LoRaWAN server is required to communicate the TEKZITEL TEKZIPARK into Thinger.io, some options are:

- [The Things Stack](https://www.thethingsindustries.com/stack/)
- [LORIOT](https://loriot.io/)
- [ChirpStack](https://www.chirpstack.io/)

Alongside, the corresponding plugin for the selected LoRaWAN server needs to be installed in your Thinger.io instance.

## Get Started

### Installation

Look for the plugin in the [Thinger.io Plugin Store](https://ma.thinger.io/) and install it in your Thinger.io instance. Once the plugin is installed a new Product will be created for this device.

### Configuration

The Product is already preconfigured, check that the auto provision prefix matches the one selected in your LoRaWAN server plugin in Thinger.io, or change it to your desire.

### Usage

Start sending uplinks for autoprovisioning devices and buckets.

This product also provides a predefined dashboard for parking occupancy monitoring.

## Additional Resources

TEKZITEL resources can be found at:

- [TEKZITEL Website](https://www.tekzitel.com)
- [Thinger.io Documentation](https://docs.thinger.io)