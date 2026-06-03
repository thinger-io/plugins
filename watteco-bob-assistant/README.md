# Bob Assistant - Vibration Sensor

BoB Assistant is a low power LoRaWAN compatible vibration sensor for indoor and outdoor predictive maintenance industrial applications, coupled with a temperature sensor for environmental conditions, a push button and an RGB Led for User Interface. It analyzes the vibration signature of industrial equipment, ensuring remote condition monitoring through LoRaWAN networks.

## Features

- **Vibration Monitoring**: Dual-frequency vibration analysis
  - Low frequency: 0-400 Hz (± 6 Hz accuracy)
  - High frequency: 0-12.8 kHz (± 200 Hz accuracy)
- **Temperature Sensing**: -20°C to +55°C range with ± 1°C accuracy
- **LoRaWAN Class A**: Standard compliance for seamless network integration
- **Extended Battery Life**: Over 2 years autonomy with replaceable 3.6V lithium battery (2000mAh)
- **Weatherproof Design**: IP68 rated enclosure for harsh environments
- **Easy Installation**: Magnetic mounting with supplied nuts and magnets
- **User Interface**: Push button and RGB LED for sensor status and network association
- **Configurable Alarms**: Vibration drift detection (default 25%, adjustable to 10%, 15%, or 20%)
- **Compact Form Factor**: 76 x 79 x 23 mm, 75 grams

## Use Cases

- Supervision of industrial installations equipped with motors (pumps, ventilation, cooling units)
- Predictive maintenance of rotating machinery
- Railway installation monitoring
- Remote condition monitoring of critical industrial equipment
- Optimization of maintenance operations

## Technical Specifications

- **Protocol**: LoRaWAN Class A with OTAA activation
- **Frequency**: EU 863-870 MHz
- **Transmission Power**: +14 dBm
- **Sensitivity**: -137 dBm
- **Data Encryption**: AES128
- **Sampling Frequency**: 5 minutes (configurable)
- **Transmission Interval**: Every 180 minutes (default)
- **Operating Temperature**: -20°C to +55°C, 0% to 95% RH (non-condensing)
- **Certifications**: CE (RED), UKCA, RoHS

## Thinger.io Integration

## Requirements

A LoRaWAN server is required to communicate the Bob Assistant Vibration Sensor into Thinger.io, some options are:

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

- [Product Page](https://www.watteco.com/product/bob-assistant-lorawan)
- [Datasheet](https://instrumentteam.no/wp-content/uploads/2023/08/WATTECO_DS_50-80-001-002_BOBASSISTANT_V2-1.pdf)
- [Thinger docs](https://docs.thinger.io)