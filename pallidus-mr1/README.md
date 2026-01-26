Now I have gathered sufficient information to create the README.md for the MCCI Catena 4430 Animal Activity Sensor. Let me compile the document following the provided template structure.

# MR1 Animal Activity Sensor

The MCCI Catena® 4430 Activity Sensor Wing (MR1) is a flexible open-source IoT sensor designed for monitoring animals in laboratories, animal hospitals, and research facilities. It allows mounting Panasonic WL series PIR sensors and connecting additional external sensors. The sensor enables real-time tracking of research animal activity (mice, rats, and similar) in cages, with data stored locally on an SD card and transmitted over LoRaWAN networks.

## Key Features

- **PIR Motion Sensing**: Passive Infrared sensor optimized for detecting animal movement using Panasonic WL series sensors
- **Environmental Monitoring**: Temperature, humidity, and light sensing via I2C bus
- **Local Data Storage**: SD card slot with dedicated power supply for data logging
- **Battery-Backed RTC**: Real-time clock compatible with Adafruit Adalogger FeatherWing
- **External Sensor Support**: JST XH-4 connector for additional sensors and accessories such as pellet feeders
- **Status Indicators**: Three LEDs (red, green, blue) for visual feedback
- **Low Power Design**: Advanced power management for extended battery operation
- **LoRaWAN Class A**: Long-range wireless connectivity with 6-minute transmission intervals

## Sensors and Measurements

| Parameter | Description |
|-----------|-------------|
| Activity | PIR-based animal movement detection |
| Temperature | Ambient temperature measurement |
| Humidity | Relative humidity sensing |
| Light | Ambient light level |
| Pellet Count | External pellet feeder monitoring |
| Battery Voltage | Power supply status |

## Technical Specifications

- **Processor**: Murata LoRa Module CMWX1ZZABZ-078 (ARM Cortex-M0+ MCU)
- **Power Supply**: USB 5V or Li-ion battery 3.7V (2.2Ah)
- **Voltage Regulator**: 3.3V regulated output
- **LoRaWAN Port**: Port 2 (Port 3 with Network Time)
- **Frequency Bands**: US915, EU868, AU921, AS923, IN866
- **Compatibility**: MCCI Catena 4610, 4612/4618, Adafruit Feather M0 LoRa

## Applications

- Laboratory animal activity monitoring
- Research rodent behavior tracking
- Animal hospital patient monitoring
- Wildlife activity studies
- Automated feeding system integration

## Thinger.io Integration

### Requirements

A LoRaWAN server is required to connect the Animal Activity Sensor to Thinger.io. Supported options include:

- [The Things Stack](https://www.thethingsindustries.com/stack/)
- [Helium Network](https://www.helium.com/)
- [ChirpStack](https://www.chirpstack.io/)

The corresponding plugin for the selected LoRaWAN server must be installed in your Thinger.io instance.

### Get Started

#### Installation

Locate the plugin in the [Thinger.io Plugin Store](https://marketplace.thinger.io/) and install it in your Thinger.io instance. Once installed, a new Product will be created for this device.

#### Configuration

The Product comes preconfigured. Verify that the auto provision prefix matches the one configured in your LoRaWAN server plugin in Thinger.io, or adjust it as needed.

#### Usage

Begin sending uplinks to automatically provision devices and data buckets.

This product includes a predefined dashboard and downlink support.

## Additional Resources

- [MCCI Catena 4430 GitHub Repository](https://github.com/mcci-catena/mcci-catena-4430)
- [Catena 4430 Sensor Firmware](https://github.com/mcci-catena/Catena4430_Sensor)
- [The Things Network Device Repository](https://www.thethingsnetwork.org/device-repository/devices/mcci/catena4430/)
- [Helium Documentation](https://docs.helium.com/network-iot/devices/development/mcci/catena4430/)
- [Thinger.io Documentation](https://docs.thinger.io)