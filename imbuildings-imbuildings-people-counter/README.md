# People Counter

The People Counter is a battery-powered infrared LoRaWAN sensor designed for accurate bi-directional people counting. It consists of two components: an infrared (IR) transmitter and an infrared receiver that work together to detect and count people passing through doorways, corridors, or other passageways. The device employs advanced infrared technology to ensure precise counting during both day and night conditions.

## Features

- **Bi-directional counting**: Tracks people entering and exiting separately for accurate occupancy calculations
- **Infrared technology**: Reliable detection in all lighting conditions, day and night
- **Battery powered**: Uses 4x AA 1.5V batteries with up to 3 years battery life depending on configuration
- **Long detection range**: IR count line supports up to 8 meters
- **Enhanced Noise Immunity (ENI)**: DSP technology filters disturbances from AM anti-shoplifting systems and pulsating lights
- **GDPR compliant**: No cameras or personal data collection
- **NFC configuration**: Easy setup using an Android smartphone
- **LoRa Alliance Certified**: Ensures quality and interoperability
- **Multi-region support**: Available for EU868, US915, AS923, AU915, and KR920 frequency bands

## Specifications

| Parameter | Value |
|-----------|-------|
| Dimensions | 116 x 69 x 22 mm |
| Power Supply | 4x AA 1.5V batteries |
| Battery Life | Up to 3 years (configuration dependent) |
| Detection Range | Up to 8 meters |
| LoRaWAN Class | Class A |
| Sample Interval | 15 minutes (configurable) |
| Certifications | CE, FCC |
| Material | ABS plastic |
| Colors | White, Black |

## Applications

- Office buildings for occupancy monitoring and space utilization
- Retail stores for customer flow analysis
- Libraries and museums for visitor counting
- Shopping malls and commercial spaces
- Public facilities and restrooms
- Parks, nature reserves, and outdoor sporting facilities
- Any environment requiring accurate foot traffic data

## Thinger.io Integration

### Requirements

A LoRaWAN server is required to connect the People Counter to Thinger.io. Compatible options include:

- [The Things Stack](https://www.thethingsindustries.com/stack/)
- [LORIOT](https://loriot.io/)
- [ChirpStack](https://www.chirpstack.io/)

The corresponding plugin for the selected LoRaWAN server must be installed in your Thinger.io instance.

### Get Started

#### Installation

Search for the plugin in the [Thinger.io Plugin Store](https://marketplace.thinger.io/) and install it in your Thinger.io instance. Once installed, a new Product will be created for this device.

#### Configuration

The Product comes preconfigured. Verify that the auto provision prefix matches the one configured in your LoRaWAN server plugin, or adjust it as needed.

#### Usage

Begin sending uplinks for automatic device and bucket provisioning.

This product includes a predefined dashboard and downlink capabilities.

## Additional Resources

- [IMBuildings Official Website](https://imbuildings.com/products/people-counter-lorawan/)
- [The Things Network Device Repository](https://www.thethingsnetwork.org/device-repository/devices/imbuildings/imbuildings-people-counter/)
- [Thinger.io Documentation](https://docs.thinger.io)