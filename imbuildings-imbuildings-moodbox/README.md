# Moodbox

The IMBUILDINGS Moodbox is an easy-to-use and integratable user feedback device. It consists of five buttons in graduated traffic light colors, allowing users to provide direct feedback through labeled smileys. The low language barrier and inhibition threshold make it ideal for use in high-traffic environments.

## Features

- 5-button design with brightly colored smiley face buttons
- Event or interval-based data transmissions
- Configurable anti-spam delay time to ignore spurious button presses
- NFC and downlink configuration
- Heartbeat monitoring
- Multiple payload options
- Wall-mount and freestanding pole mount options available
- Can be customized as a buttonbox with specific knobs, colors, and pictograms

## Specifications

| Parameter | Value |
|-----------|-------|
| Buttons | 5 |
| Power Supply | 2x 3.6V AA Lithium batteries |
| Battery Life | ~5 years (standard configuration) |
| Communication | LoRaWAN Class A |
| Frequency Plans | EU868, US915, AS923, AU915 |
| Configuration | NFC app and downlinks |
| Dimensions | 250 x 105 x 30 mm |
| Material | White ABS |

## Use Cases

- Customer satisfaction surveys
- Toilet cleanliness feedback
- Restaurant and hospitality ratings
- Hotel stay experience feedback
- Service request buttons (coffee, paper, soap, etc.)
- Smart buildings
- Retail environments
- Facility management
- Park management

## Thinger.io Integration

### Requirements

A LoRaWAN server is required to connect the IMBUILDINGS Moodbox to Thinger.io. Some options are:

- [The Things Stack](https://www.thethingsindustries.com/stack/)
- [LORIOT](https://loriot.io/)
- [ChirpStack](https://www.chirpstack.io/)

The corresponding plugin for the selected LoRaWAN server needs to be installed in your Thinger.io instance.

### Get Started

#### Installation

Look for the plugin in the [Thinger.io Plugin Store](https://marketplace.thinger.io/) and install it in your Thinger.io instance. Once the plugin is installed, a new Product will be created for this device.

#### Configuration

The Product is already preconfigured. Check that the auto provision prefix matches the one selected in your LoRaWAN server plugin in Thinger.io, or change it as desired.

#### Usage

Start sending uplinks for autoprovisioning devices and buckets.

This product also provides a predefined dashboard for visualizing feedback data.

## Additional Resources

IMBUILDINGS resources can be found at:

- [IMBUILDINGS Moodbox LoRaWAN Product Page](https://imbuildings.com/products/moodbox-lorawan/)
- [The Things Network Device Repository](https://www.thethingsnetwork.org/device-repository/devices/imbuildings/imbuildings-moodbox/)
- [LoRa Alliance Product Page](https://lora-alliance.org/marketplace/imbuildings-b-v/moodbox/)
- [Thinger.io Documentation](https://docs.thinger.io)