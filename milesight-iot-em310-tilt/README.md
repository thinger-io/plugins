# EM310 - Tilt Sensor

The Milesight EM310-TILT is a LoRaWAN® tilt sensor that accurately monitors object status in real time through 3-axis angle measurement. Featuring a built-in accelerometer, the device detects tilt angles along X, Y, and Z axes, requiring only the configuration of a relative initial surface and angle threshold for straightforward and effortless operation.

## Features

- **3-Axis Accelerometer**: Built-in sensor for precise tilt angle monitoring across X, Y, and Z axes
- **LoRaWAN® Connectivity**: Long-range wireless communication with low power consumption
- **IP67 Protection**: Waterproof and salt spray resistant enclosure suitable for outdoor deployments
- **Compact Design**: Dimensions of 62 x 111 x 33 mm for versatile installation
- **Wide Operating Range**: Functions in temperatures from -20°C to 60°C
- **Battery Powered**: Long-lasting operation for remote monitoring applications

## Use Cases

- Tree monitoring and forest management
- Pole lean detection for utility infrastructure
- Landslide monitoring and geological surveying
- Asset movement detection and security
- Structural health monitoring
- Equipment and machinery orientation tracking

## Thinger.io Integration

The EM310-TILT integrates seamlessly with Thinger.io through LoRaWAN network servers, enabling real-time monitoring, data visualization, and alerting based on tilt angle measurements.

## Requirements

A LoRaWAN server is required to communicate the Milesight EM310-TILT into Thinger.io, some options are:

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

Milesight resources can be found at:

- [EM310-TILT Product Page](https://www.milesight.com/iot/product/lorawan-sensor/em310-tilt)
- [EM310-TILT Datasheet](https://resource.milesight.com/milesight/iot/document/em310-tilt-datasheet-en.pdf)
- [Thinger.io Documentation](https://docs.thinger.io)