# MODEL A3 - Air Quality Monitoring

The uRADMonitor MODEL A3 is a plug and play advanced air quality monitoring station enclosed in a compact, rugged aluminium body. This automated fixed monitoring station features an array of sensors that track up to 11 important environmental parameters including Particulate Matter (PM1, PM2.5, PM10), Ozone (O3), Formaldehyde (HCHO), Carbon Dioxide (CO2), Volatile Organic Compounds (VOC), temperature, barometric pressure, air humidity, and noise levels.

## Features

- **Particulate Matter Sensors**: PM1, PM2.5, PM10 measurement capabilities
- **Gas Sensors**: Ozone (O3), Formaldehyde (0-5 ppm), Carbon Dioxide (CO2), VOC
- **Environmental Sensors**: Temperature, humidity, barometric pressure
- **Noise Monitoring**: Integrated sound level measurement
- **Compact Design**: 110 x 65 x 25 mm aluminium enclosure
- **Wide Operating Range**: -20°C to +65°C
- **LoRaWAN Connectivity**: Long-range wireless communication

## Use Cases

- Urban air quality monitoring networks
- Industrial emissions monitoring
- Smart city environmental tracking
- Indoor air quality assessment
- Public health data collection
- Pollution hotspot identification

## Thinger.io Integration

The MODEL A3 integrates with Thinger.io through LoRaWAN connectivity, enabling remote monitoring and data visualization of all environmental parameters in real-time.

## Requirements

A LoRaWAN server is required to communicate the uRADMonitor MODEL A3 into Thinger.io, some options are:

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

Start sending uplinks for autoprovisioning devices and buckets. This product also provides a predefined dashboard and downlinks.

## Additional Resources

uRADMonitor resources can be found at:

- [Official Website](https://www.uradmonitor.com/uradmonitor-model-a3/)
- [Product Datasheet](https://www.uradmonitor.com/wp-content/uploads/2021/08/a3_datasheet_v109_en_compressed.pdf)
- [Quickstart Guide](https://www.uradmonitor.com/wp-content/uploads/2019/01/a3_quickstart_v106.pdf)
- [TTN Device Repository](https://www.thethingsnetwork.org/device-repository/devices/uradmonitor/model-a3/)
- [Thinger.io Documentation](https://docs.thinger.io)