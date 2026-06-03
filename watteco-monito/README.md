# Monit'O - Analog Interface

The WATTECO Monit'O offers 2 analog inputs isolated from each other allowing the measurement of voltage, 0-100mVolts and 0-70Volts. The measurements are transmitted periodically on the LoRaWAN® network. Monit'O is often used for battery monitoring applications including 12V, 24V, and 48V battery systems in industrial and commercial environments.

## Key Features

- **2 Isolated Analog Inputs**: 0-70V and 0-100mV measurement ranges
- **High Precision**: ±70mV accuracy
- **12-bit Resolution**: 17mV resolution for detailed measurements
- **Long Battery Life**: More than 10 years of autonomy depending on configuration
- **Durable Design**: IP55 rated for protection against dust and water jets
- **LoRaWAN Connectivity**: Standard LoRaWAN® protocol support
- **Compliance**: RED and RoHS certified
- **Easy Connection**: Available with 1.5m wire [AWG 20-26]

## Use Cases

- Battery voltage monitoring in remote locations
- Industrial battery system supervision
- UPS and backup power monitoring
- Solar panel voltage tracking
- Critical infrastructure power management
- Industrial equipment voltage monitoring

## Thinger.io Integration

The Monit'O integrates with Thinger.io through LoRaWAN network servers, enabling real-time monitoring and management of analog voltage measurements in cloud-based IoT applications.

## Requirements

A LoRaWAN server is required to communicate the WATTECO Monit'O into Thinger.io, some options are:

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

WATTECO resources can be found at:

- [Official Documentation](https://support.watteco.com/monito)
- [Product Page](https://www.watteco.com/product/monito-lorawan)
- [Thinger docs](https://docs.thinger.io)