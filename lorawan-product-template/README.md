# LoRaWAN Thinger.io Product Template

<p align="center">
  <img src="/plugins/lorawan-product-template/assets/lorawan.png" alt="LoRaWAN Thinger.io Product" style="max-width: 200px; height: auto;" onerror="this.src='https://www.weble.ch/wp-content/uploads/2019/12/lw.png';this.onerror='';">
</p>

The LoRaWAN Product Template is a foundational framework designed to accelerate the development of LoRaWAN-based IoT products within the Thinger.io ecosystem. It provides a standardized approach to configuring LoRaWAN devices, ensuring seamless integration with any of the supported LoRaWAN Network Servers (LNS) while maintaining complete LNS-agnostic product logic.

## Key Features 

### Multi-LNS Support

 - LORIOT: Full integration with LORIOT network server
 - The Things Stack: Compatible with TTN/TTS implementations
 - Chirpstack: Native support for Chirpstack deployments

### LNS-Agnostic Design
The template ensures that your product logic remains completely independent of the underlying LNS. This means:

 - Write your product code once
 - Deploy across different network servers without modification
 - Switch LNS providers without code changes
 - Focus on device behavior, not network integration

### Pre-configured Components
 - Standard uplink/downlink message handling
 - Automatic payload decoding pipeline
 - Device property management

## Documentation and Resources

For detailed documentation on how to utilize the LoRaWAN Product Template, please refer to the following resources:

 - [Thinger.io LoRaWAN Documentation](https://docs.thinger.io/lpwan/the-things-stack)
