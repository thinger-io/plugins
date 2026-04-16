# EM400-UDL - Ultrasonic Distance Sensor

The EM400-UDL is a non-contact ultrasonic distance sensor designed for outdoor applications such as monitoring water level, fill level of tanks and silos, presence of objects, or snow level. Equipped with replaceable batteries and IP67 waterproof enclosure, it provides reliable long-term operation in harsh environmental conditions.

## Features

- **Multiple Range Options**: Selective probes vary from 25 to 1000 cm for different applications
  - Standard Version: C050 (25-500 cm), C100 (25-1000 cm)
  - Pro Version: W050 (30-500 cm), W100 (50-1000 cm)
- **High Accuracy**: ± (1+0.3%*S) cm for standard version, ±1% FS for pro version
- **Long Battery Life**: Two built-in 9000 mAh replaceable ER26500 Li-SOCL2 batteries for up to 10 years operation
- **Built-in Sensors**: NTC temperature sensor (-40°C to 125°C) and 3-axis accelerometer for tilt detection
- **Durable Design**: Damp-proof coating and IP67 waterproof enclosure for outdoor use
- **NFC Configuration**: One-touch configuration via NFC, supports card emulation mode
- **LoRaWAN® Connectivity**: Ultra-wide-distance wireless transmission up to 15 km line of sight
- **LoRaWAN® Class A**: OTAA/ABP activation modes
- **Frequency Bands**: CN470/IN865/RU864/EU868/US915/AU915/KR920/AS923-1&2&3&4
- **Advanced Features**: Calibration, threshold alarm, tilt & distance switch, cumulative report (NB version)

## Use Cases

- Water level monitoring in rivers, wells, and reservoirs
- Fill level monitoring in tanks and silos
- Snow level measurement
- Presence detection of objects
- Flood warning systems
- Waste management (bin level monitoring)
- Industrial liquid storage monitoring

## Technical Specifications

### Measurement
- **Distance Range**: 25 cm to 1000 cm (depending on probe model)
- **Resolution**: 1 mm
- **Temperature Range**: -40°C to 125°C
- **Temperature Resolution**: 0.1°C

### LoRaWAN®
- **Frequency**: CN470/IN865/RU864/EU868/US915/AU915/KR920/AS923-1&2&3&4
- **Tx Power**: 16 dBm (868 MHz), 20 dBm (915 MHz), 19 dBm (470 MHz)
- **Sensitivity**: -137 dBm @300 bps
- **Mode**: OTAA/ABP
- **Class**: A

### Physical
- **Dimensions**: 65 x 80 x 118 mm
- **Enclosure**: IP67
- **Operating Temperature**: -30°C to 70°C
- **Power Supply**: 2 x 9000 mAh ER26500 Li-SOCL2 batteries
- **Battery Life**: > 10 years (LoRaWAN® version)

## Thinger.io Integration

The EM400-UDL can be seamlessly integrated into Thinger.io through standard LoRaWAN® network servers, enabling remote monitoring and management of distance measurements, temperature data, and device status.

## Requirements

A LoRaWAN® server is required to communicate the Milesight EM400-UDL into Thinger.io, some options are:

- [The Things Stack](https://www.thethingsindustries.com/stack/)
- [LORIOT](https://loriot.io/)
- [ChirpStack](https://www.chirpstack.io/)

Alongside, the corresponding plugin for the selected LoRaWAN® server needs to be installed in your Thinger.io instance.

## Get Started

### Installation

Look for the plugin in the [Thinger.io Plugin Store](https://marketplace.thinger.io/) and install it in your Thinger.io instance. Once the plugin is installed a new Product will be created for this device.

### Configuration

The Product is already preconfigured, check that the auto provision prefix matches the one selected in your LoRaWAN® server plugin in Thinger.io, or change it to your desire.

### Usage

Start sending uplinks for autoprovisioning devices and buckets.
This product also provides a predefined dashboard and downlinks for threshold alarm configuration and device management.

## Additional Resources

Milesight resources can be found at:

- [EM400-UDL Datasheet](https://resource.milesight.com/milesight/iot/document/em400-udl-datasheet-en.pdf)
- [EM400-UDL User Guide](https://resource.milesight.com/milesight/iot/document/em400-udl-user-guide-en.pdf)
- [Thinger.io Documentation](https://docs.thinger.io)