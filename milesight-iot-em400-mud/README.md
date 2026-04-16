# EM400-MUD - Multifunctional Ultrasonic Distance Sensor

The EM400-MUD is a multifunctional ultrasonic distance sensor designed to detect small-range areas and small blind spots. This versatile LoRaWAN device features multiple application modes catering to various scenarios such as smart waste management, smart parking, and distance/level measurement applications. With a detection range of 3 to 450 cm and minimal blind zone, the EM400-MUD provides accurate measurements with built-in temperature sensing and tilt detection capabilities.

## Key Features

- **Wide Detection Range**: 3 to 450 cm measurement capability with 1 mm resolution
- **High Accuracy**: ± (1+0.3%*S) cm detection accuracy (-15°C ~ 60°C), where S equals distance
- **Three Pre-set Modes**: Standard Mode, Bin Mode, and Parking Lot Mode optimized for different applications
- **Long Battery Life**: Up to 10 years in Standard and Bin modes (LoRaWAN version)
- **NFC Configuration**: One-touch configuration with card emulation mode support
- **Integrated Sensors**: Distance, temperature (-40°C ~ 125°C), accelerometer for tilt detection
- **IP67 Enclosure**: Robust weatherproof design for outdoor deployment
- **LoRaWAN Connectivity**: Long-range wireless transmission up to 15 km line of sight
- **Multiple Frequency Bands**: CN470/IN865/RU864/EU868/US915/AU915/KR920/AS923-1&2&3&4
- **Advanced Features**: Threshold alarms, calibration, tilt & distance switch, cumulative reporting

## Use Cases

- **Smart Waste Management**: Monitor bin fill levels and optimize collection routes
- **Smart Parking**: Detect parking space occupancy in real-time
- **Level Monitoring**: Measure liquid or material levels in tanks and silos
- **Distance Measurement**: General-purpose distance sensing applications
- **Asset Tracking**: Monitor position and tilt status of equipment

## Technical Specifications

### Distance Measurement
- Detection Range: 3 ~ 450 cm
- Detection Resolution: 1 mm
- Detection Accuracy: ± (1+0.3%*S) cm, where S = distance (-15°C ~ 60°C)
- Beam Angle: 60°
- Device Position Status: Normal/Tilt

### Temperature Sensor
- Temperature Range: -40 ~ 125°C
- Resolution: 0.1°C

### LoRaWAN Specifications
- Frequency Bands: CN470/IN865/RU864/EU868/US915/AU915/KR920/AS923-1&2&3&4
- TX Power: 16 dBm (868 MHz) / 20 dBm (915 MHz) / 19 dBm (470 MHz)
- Sensitivity: -137 dBm @ 300 bps
- Activation Mode: OTAA/ABP
- Class: Class A

### Power and Battery
- Power Supply: 2 × 9000 mAh ER26500 Li-SOCl2 Batteries
- Battery Life (LoRaWAN):
  - Standard Mode: > 10 years (10 min interval, 25°C)
  - Bin Mode: > 10 years (20 min interval, 25°C)
  - Parking Lot Mode: 5 years (12 triggers per day, 25°C)

### Physical Characteristics
- Dimensions: 65 × 32.5 × 118 mm
- Operating Temperature: -30°C ~ 70°C
- Enclosure: IP67

### Interface and Configuration
- LED: 1 × LED Indicator (Internal)
- Button: 1 × Power/Reset Button (Internal)
- NFC: One-touch configuration via mobile app
- Configuration Methods: Mobile App (via NFC), Downlink

## Thinger.io Integration

The EM400-MUD integrates seamlessly with Thinger.io through LoRaWAN network servers, enabling remote monitoring and management of distance measurements, temperature data, and device status.

## Requirements

A LoRaWAN server is required to communicate the Milesight EM400-MUD into Thinger.io. Supported options include:

- [The Things Stack](https://www.thethingsindustries.com/stack/)
- [LORIOT](https://loriot.io/)
- [ChirpStack](https://www.chirpstack.io/)

Alongside, the corresponding plugin for the selected LoRaWAN server needs to be installed in your Thinger.io instance.

## Get Started

### Installation

Look for the plugin in the [Thinger.io Plugin Store](https://marketplace.thinger.io/) and install it in your Thinger.io instance. Once the plugin is installed, a new Product will be created for this device.

### Configuration

The Product is already preconfigured with the necessary payload decoders and device properties. Check that the auto-provision prefix matches the one selected in your LoRaWAN server plugin in Thinger.io, or change it to your preference.

### Usage

Start sending uplinks for autoprovisioning devices and buckets. The device will automatically report:

- Distance measurements (cm)
- Temperature readings (°C)
- Battery level (%)
- Tilt status
- Device position status

This product also provides predefined dashboards and downlink capabilities for remote configuration.

## Additional Resources

Milesight resources can be found at:

- [Official Product Page](https://www.milesight.com/iot/product/lorawan-sensor/em400-mud)
- [EM400-MUD Datasheet](https://resource.milesight.com/milesight/iot/document/em400-mud-datasheet-en.pdf)
- [Thinger.io Documentation](https://docs.thinger.io)