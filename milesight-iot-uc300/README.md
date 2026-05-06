# Milesight UC300 Series IoT Controller

The Milesight UC300 series is an IoT controller used for remote control and data acquisition from diverse devices. It contains multiple I/O interfaces including analog input, digital input, relay output, serial port, PT100 RTD input, which support remote device data transmission via LoRaWAN®. Besides, UC300 series supports multiple trigger conditions and actions which can work autonomously even when the network dropped. Adopting industrial design and IP30 metal case, UC300 is widely used in indoor applications like smart factory, building automation, etc.

## Features

- Easy to connect with diverse wired devices through DI/O/AI/RS232/RS485/PT100 RTD input interfaces
- Support reading 32 Modbus registers, can connect up to 32 Modbus devices
- Support LoRaWAN® or 3/4G wireless communication
- Multiple triggering conditions and actions for autonomous operation
- Embedded watchdog for device working stability
- Industrial metal case design (IP30) with wide operating temperature range (-20°C to 60°C)
- Compliant with standard LoRaWAN® gateways and network servers
- Quick and easy management with Milesight IoT Cloud solution

## Technical Specifications

### I/O Interfaces

**Digital I/O**
- 4 × Digital Input (DI) + 2 × Digital Output (DO)
- Digital Input: Opto-isolated, 3-24VDC, Pulse Counter mode support
- Input Frequency: ≤4000 Hz
- Digital Output: SPDT Relay, Max 3A@DC 30V or AC 250V

**Analog Input**
- 2 × 4-20 mA (±5% accuracy)
- 2 × 0-10 V (±1% accuracy)
- Resolution: 12 bit

**PT100 RTD Input**
- 2 × PT100 RTD Input
- Input Connections: 2, 3-wire
- Resolution: 12 bit
- Range: -200°C to 800°C

**Serial Ports**
- 1 × RS232 + 1 × RS485
- Baud Rate: 1200-115200 bps
- Protocol: RS232 Transparent, RS485 Transparent/Modbus RTU

### LoRaWAN® Specifications

- Protocol: LoRaWAN®, Milesight D2D
- Frequency: CN470/IN865/EU868/RU864/US915/AU915/KR920/AS923-1&2&3&4
- Antenna: 50Ω SMA Connector (Center PIN: SMA Female)
- Tx Power: 16 dBm (868 MHz) / 20 dBm (915 MHz) / 19 dBm (470 MHz)
- Sensitivity: -137 dBm @300bps
- Mode: OTAA/ABP
- Class: C

### Physical Characteristics

- Dimensions: 22 × 70 × 93 mm
- Enclosure: IP30 metal case
- Operating Temperature: -20°C to 60°C
- Interface Type: 3.5mm Terminal Block
- Configuration Port: USB Type-C for power supply, configuration and console
- Button: 1 × Reset Button (Internal)
- LED Indicators: 1 × System, 1 × ACT
- Power Connector: 3.5mm 2-pin Terminal Block with Surge-Protection and Reverse Polarity Protection

## Thinger.io Integration

The Milesight UC300 series can be integrated into Thinger.io platform through a LoRaWAN network server, enabling remote monitoring and control of connected devices and sensors.

## Requirements

A LoRaWAN server is required to communicate the Milesight UC300 Series into Thinger.io, some options are:

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

## Use Cases

- Smart Factory: Industrial equipment monitoring and control
- Building Automation: HVAC systems, lighting control, energy management
- Remote Data Acquisition: Temperature monitoring via PT100 sensors
- Process Control: Integration with Modbus devices and legacy industrial equipment
- Equipment Monitoring: Digital pulse counting, analog signal monitoring

## Additional Resources

Milesight resources can be found at:

- [Product Documentation](https://resource.milesight.com/milesight/iot/document/uc300-datasheet-en.pdf)
- [Thinger docs](https://docs.thinger.io)