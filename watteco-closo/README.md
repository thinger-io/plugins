# Clos'O - Contact Sensor

The Clos'O sensor is used to ensure an access gate is properly closed. Attached to the frame (or the fixed part), it detects the position of a magnet mounted on the moving part of the gate. It also reports the open or closed state of the gate over a public or private LoRaWAN™ radio network. An alert is transmitted if the sensor is pulled off.

## Features

- Detection of gate opening and closing
- Large detection distance: up to 35mm
- Sensor pullout alert for security
- Very simple installation
- More than 5 years of autonomy
- LoRaWAN® Class A device
- Set intended for outdoor use
- Dimensions: 100 x 100 x 40 mm
- Operating temperature: -20°C to 60°C

## Use Cases

- Monitor the proper closing of access gates
- Railway installation monitoring
- Building access control
- Security and intrusion detection
- Outdoor gate and door monitoring

## Thinger.io Integration

The Clos'O contact sensor can be integrated into Thinger.io through LoRaWAN network servers, enabling remote monitoring of gate and door status with automated alerts for open/closed states and tampering detection.

## Requirements

A LoRaWAN server is required to communicate the Clos'O sensor into Thinger.io, some options are:

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

Watteco resources can be found at:

- [Product Page](https://www.watteco.com/product/closo-sensor-lorawan)
- [Device Repository](https://www.thethingsnetwork.org/device-repository/devices/watteco/closo)
- [Thinger docs](https://docs.thinger.io)