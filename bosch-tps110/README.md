Based on the device data provided, I will create the README.md documentation:

```markdown
# BOSCH Parking Lot Sensor

The BOSCH wireless smart parking sensor is a LoRaWAN® end device designed for parking space occupancy detection. It utilizes dual-sensor technology combining a magnetometer and radar for highly reliable vehicle detection. The sensor enables active parking lot management features including search, navigation, and reservation capabilities. Additionally, the BOSCH parking lot sensor integrates a GPS receiver for precise location tracking and a temperature sensor for environmental monitoring.

## Key Features

- **Dual-sensor detection**: Magnetometer and radar for accurate occupancy detection
- **GPS receiver**: Precise geolocation of parking spaces
- **Temperature sensor**: Environmental monitoring capability
- **LoRaWAN® connectivity**: Long-range, low-power wireless communication
- **Robust design**: Suitable for outdoor parking lot installations

## Sensors and Measurements

| Sensor | Measurement | Description |
|--------|-------------|-------------|
| Magnetometer | Magnetic field variation | Detects vehicle presence by measuring magnetic field changes |
| Radar | Object detection | Provides secondary occupancy verification |
| GPS | Latitude/Longitude | Enables precise parking space positioning |
| Temperature | °C | Monitors ambient temperature conditions |

## Use Cases

- Smart city parking management
- Shopping center and retail parking guidance
- Airport and transportation hub parking systems
- Street parking monitoring
- Commercial and industrial parking facilities
- Parking search and navigation applications
- Parking space reservation systems

## Thinger.io Integration

### Requirements

A LoRaWAN server is required to connect the BOSCH Parking Lot Sensor to Thinger.io. Supported options include:

- [The Things Stack](https://www.thethingsindustries.com/stack/)
- [LORIOT](https://loriot.io/)
- [ChirpStack](https://www.chirpstack.io/)

The corresponding plugin for the selected LoRaWAN server must be installed in your Thinger.io instance.

### Get Started

#### Installation

Look for the plugin in the [Thinger.io Plugin Store](https://marketplace.thinger.io/) and install it in your Thinger.io instance. Once the plugin is installed, a new Product will be created for this device.

#### Configuration

The Product is preconfigured for immediate use. Verify that the auto provision prefix matches the one selected in your LoRaWAN server plugin in Thinger.io, or adjust it as needed.

#### Usage

Start sending uplinks for automatic device and bucket provisioning.

This product provides:
- Parking occupancy status tracking
- GPS position data storage
- Temperature monitoring
- Predefined dashboard for visualization

## Additional Resources

- [BOSCH Connectivity](https://www.bosch-connectivity.com/)
- [Thinger.io Documentation](https://docs.thinger.io)
```