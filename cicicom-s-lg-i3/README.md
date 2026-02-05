# SLG-I3 Parking Sensor

Cicicom's LoRaWAN smart parking sensor SL-G-I3 accurately detects parking events, by utilizing cutting-edge triple detection technology (magnetic sensor, motion sensor, radar). All sensors and algorithms are tuned and optimized for ultra-low power consumption, providing continuous vehicle detection with higher than 99% accuracy and resulting to complete monitoring and management of parking spots.

## Features

- **Triple Detection Technology**: Combines magnetic sensor, motion sensor, and 60GHz radar for enhanced accuracy
- **High Accuracy**: Over 99% vehicle detection accuracy
- **Auto-Calibration**: Sensor auto-calibration on frequent intervals ensures consistent performance
- **Real-Time Detection**: Accurate real-time vehicle presence monitoring
- **Ultra-Low Power**: Optimized algorithms for extended battery life
- **Robust Enclosure**: IP68 rated for outdoor installation
- **LoRaWAN Connectivity**: Long-range wireless communication

## Use Cases

- Smart city parking management
- Commercial parking lot monitoring
- Street parking optimization
- Parking guidance systems
- Revenue management for parking facilities
- Real-time parking space availability tracking

## Technical Specifications

- **Sensors**: Magnetic sensor, motion sensor, 60GHz radar
- **Protection Rating**: IP68
- **Communication Protocol**: LoRaWAN
- **Detection Accuracy**: >99%

## Thinger.io Integration

The SLG-I3 Parking Sensor integrates seamlessly with Thinger.io through LoRaWAN connectivity, enabling real-time monitoring and management of parking spaces.

## Requirements

A LoRaWAN server is required to communicate the Cicicom SLG-I3 Parking Sensor into Thinger.io, some options are:

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
This product also provides a predefined dashboard for monitoring parking space occupancy in real-time.

## Additional Resources

Cicicom resources can be found at:

- [Device Repository](https://www.thethingsnetwork.org/device-repository/devices/cicicom/s-lg-i3/)
- [Thinger docs](https://docs.thinger.io)