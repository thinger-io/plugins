# Trashbin Sensor

The Trashbin Sensor is a LoRaWAN-enabled device designed for monitoring trash fill levels in waste management applications. Using ultrasonic distance measurement technology, the sensor provides real-time data on bin capacity, enabling optimized collection routes and efficient waste management operations.

## Features

- **Ultrasonic Distance Measurement**: Monitors fill level with high accuracy
- **LoRaWAN Connectivity**: Long-range wireless communication with low power consumption
- **Battery Level Monitoring**: Tracks device battery status for maintenance planning
- **Temperature Sensor**: Monitors ambient temperature conditions
- **Compact Design**: Space-efficient form factor suitable for various bin types
- **Wide Operating Temperature Range**: -30°C to 85°C
- **Long Battery Life**: Optimized for extended deployment periods

## Technical Specifications

- **Measurement Range**: 300 to 4500mm
- **Measurement Accuracy**: ±10mm
- **Resolution**: 1.0mm
- **Sensor Type**: Ultrasonic sensor (40kHz)
- **Operating Temperature**: -30°C to 85°C
- **Dimensions**: 26 x 34 x 77mm (typical configuration)
- **Weight**: Approximately 350 grams
- **Frequency Plans**: EU863-870 (region-dependent)
- **LoRaWAN Data Rate**: 250bps to 5470bps
- **Antenna**: Internal antenna
- **Sensor Sampling Rate**: Configurable from 10s to 3600s

## Use Cases

- Smart city waste management optimization
- Real-time bin fill level monitoring
- Route optimization for collection services
- Operational cost reduction through efficient scheduling
- Overflow prevention and improved service quality
- Environmental monitoring in waste collection areas

## Thinger.io Integration

The Trashbin Sensor integrates seamlessly with Thinger.io through LoRaWAN network servers, enabling centralized monitoring and management of waste bin fill levels across multiple locations.

## Requirements

A LoRaWAN server is required to communicate the Trashbin Sensor into Thinger.io, some options are:

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

- [Thinger.io Documentation](https://docs.thinger.io)
- [LoRaWAN Device Repository](https://www.thethingsnetwork.org/device-repository/)