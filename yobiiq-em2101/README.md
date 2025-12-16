# EM2101
The YOBIIQ iQ Electricity EM2101 is a certified single-phase smart electricity meter with LoRaWAN connectivity and a built-in safety relay. It allows precise monitoring and control of energy consumption, recording measurements such as voltage, current, frequency, active power, power factor, and active energy, while enabling remote management via LoRaWAN networks.
## Thinger.io and EM2101 Integration
Integrating the EM2101 with Thinger.io provides real-time monitoring, automated energy management, and actionable insights into power consumption. Key benefits include:
**Remote Control:** Operate the internal relay remotely to shut off or switch on power based on configurable thresholds.


**Comprehensive Data Collection:** Record and transmit energy metrics in real time, enabling efficient energy management and billing systems.


**Resilient Logging:** Local data logging ensures no data is lost even if the network is temporarily unavailable.


**Flexible Configuration:** Configure up to 10 different uplink ports with custom intervals and measurement parameters.

**LoRaWAN Network:** Requires a LoRaWAN-compatible gateway or network server to transmit data to Thinger.io.


**Use Cases:** Residential, commercial, and industrial energy monitoring, smart metering, and building automation systems.


## Get Started

### Requirements

- LoRaWAN Network Server (LNS): Required to receive sensor data and forward it to Thinger.io. Supported servers include TTN, Loriot, Chipstark, or other compatible LNS.
- Deploy a LoraWan plugin in Thinger.io: [The Things Stack, Chipstark and Loriot.](https://docs.thinger.io/lpwan/the-things-stack)

### Configuration
- The EM2101 plugin comes with pre-configured dashboards for real-time monitoring of voltage, current, active power, and energy.
- Configure uplink intervals, thresholds, and notifications directly in the Thinger.io console if needed.

### Usage
1. Visualize real-time measurements using Thinger.io dashboards.
2. Set automated alerts or actions when thresholds are exceeded.
3. Troubleshoot by checking device logs or verifying LoRaWAN connectivity through Thinger.io.

## Additional Resources
[EM2101 Datasheet](https://yobiiq.com/products/electricity-meters/iq-em2101-electricity-meter/)
[YOBIIQ Decoders GitHub Repository](https://github.com/Yobiiq-BV/yobiiq-decoders)
