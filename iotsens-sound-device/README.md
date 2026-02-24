# IoTsens Sound Level Meter

The IoTsens Sound Level Meter is a LoRaWAN® device designed to monitor environmental noise levels in real-time. Equipped with an integrated microphone (sound sensor), this device can capture and analyze ambient sound using A-weighted measurements within the audible frequency range, making it ideal for acoustic monitoring applications in urban, industrial, and environmental settings.

## Features

- **Integrated Microphone**: High-quality sound sensor for accurate noise level detection
- **Wide Measurement Range**: Captures sound levels from 30 to 120 dBA
- **Advanced Metrics**: Provides LAeq (equivalent continuous sound level), LAmax (maximum sound level), and LAmin (minimum sound level)
- **LoRaWAN® Connectivity**: Long-range wireless communication for remote monitoring
- **Additional Sensors**: Battery monitoring and temperature sensor
- **Rugged Design**: IP65-rated enclosure for outdoor deployment
- **Operating Temperature**: -20°C to 65°C
- **Compact Dimensions**: 250 x 120 x 60 mm

## Use Cases

- Urban noise pollution monitoring
- Industrial workplace noise compliance
- Smart city acoustic management
- Environmental impact assessment
- Construction site noise monitoring
- Transportation and traffic noise analysis
- Residential and commercial area monitoring

## Thinger.io Integration

The IoTsens Sound Level Meter integrates seamlessly with Thinger.io through LoRaWAN network servers, enabling centralized monitoring, data visualization, and acoustic analysis.

## Requirements

A LoRaWAN server is required to communicate the IoTsens Sound Level Meter into Thinger.io. Compatible options include:

- [The Things Stack](https://www.thethingsindustries.com/stack/)
- [LORIOT](https://loriot.io/)
- [ChirpStack](https://www.chirpstack.io/)

Alongside, the corresponding plugin for the selected LoRaWAN server needs to be installed in your Thinger.io instance.

## Get Started

### Installation

Look for the plugin in the [Thinger.io Plugin Store](https://marketplace.thinger.io/) and install it in your Thinger.io instance. Once the plugin is installed, a new Product will be created for this device.

### Configuration

The Product is already preconfigured. Check that the auto provision prefix matches the one selected in your LoRaWAN server plugin in Thinger.io, or change it to your preference.

### Usage

Start sending uplinks for autoprovisioning devices and buckets. This product provides predefined dashboards for noise level visualization and analysis.

## Additional Resources

- [The Things Network Device Repository](https://www.thethingsnetwork.org/device-repository/devices/iotsens/sound-device/)
- [Thinger.io Documentation](https://docs.thinger.io)