# Milesight Smart Current Transformer

<p align="center">
  <img src="assets/milesight-sct.png" style="height: 250px" alt="Milesight Smart Current Transformer">
</p>

**This plugin is exclusively compatible with Milesight CT Series models CT101, CT103, and CT105.**


The Milesight Smart Current Transformer is a high-precision AC measurement device designed for real-time current monitoring in industrial and commercial environments. Its compact design, fast installation, and accurate sensing capabilities make it ideal for load analysis, equipment protection, and energy-efficiency applications. The Thinger.io plugin enables seamless integration of CT data for cloud visualization and automated processing.
## Thinger.io and Milesight Current Transformer Integration
Integrating the CT Series with Thinger.io provides unified device connectivity, structured data ingestion, and advanced analytics. Users can access real-time current measurements, create dashboards, and configure alerts for overloads or abnormal consumption. The plugin enhances energy-monitoring workflows by enabling historical storage, automated reporting, and interoperability with external systems through Thinger.io’s API and integration tools.




## Requirements
- LoRaWAN Network Server (LNS): Required to receive sensor data and forward it to Thinger.io. Supported servers include TTN, Loriot, Chipstark, or other compatible LNS.
- Deploy a LoRaWAN plugin in Thinger.io:[The Things Stack, Chipstark and Loriot.](https://docs.thinger.io/lpwan/the-things-stack)


## Get Started
### Configuration
1. Provide device identifiers and communication parameters.
2. Configure LoRaWAN options as applicable.
3. Save and enable the plugin.


### Usage
- Once configured, the CT data becomes available as live resources within Thinger.io. Users can:
- Instantly view measurements through the prebuilt dashboard, including real-time current values and device status.
- Store time-series data in buckets for historical analysis.
- Create alerts for thresholds or anomalies.
- Integrate measurements with automation workflows and external services.


## Additional Resources
- [Milesight CT Series Product Page](https://www.milesight.com/iot/smart-current-transformer-ads)
- [CT Series decoders](https://github.com/Milesight-IoT/SensorDecoders/tree/main/ct-series)
- [Thinger.io Community Forum](https://community.thinger.io/)
