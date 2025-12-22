# **Dragino LHT65N**

The Dragino LHT65N is a long-range LoRaWAN® temperature and humidity sensor designed for non-invasive, real-time monitoring of environmental variables in industrial, commercial, and smart building applications. The LHT65N integrates a precision SHT20 sensor and supports connectors for optional external sensors (DS18B20, interrupt sensors, illuminance, etc.), enabling seamless integration into Thinger.io for dashboards, alerts, and historical data analytics.

## **Integrating the LHT65N with Thinger.io**

Integrating the LHT65N with Thinger.io provides:

Real-time environmental monitoring: Internal temperature, relative humidity, battery voltage, and device status with configurable sampling intervals.

Automated alarms: Temperature, humidity, and battery threshold detection for proactive maintenance and fault prevention.

IoT dashboards: Stream data to Thinger.io for visualization, logging, analysis, and notifications.

Flexible deployment: Support for multiple frequency bands (EU868, US915, AU915, AS923, CN470, KR920, IN865, EU433) and configurable external sensors.

### **Typical Use Cases:**

- Energy management and environmental optimization in smart buildings.

- Monitoring environmental conditions in warehouses, data centers, and technical rooms.

- Temperature and humidity control in cold chain and logistics.

- Precision agriculture and automated irrigation systems.

- Predictive maintenance and early fault detection through environmental pattern analysis.

- Integration into IoT platforms for dashboards, historical analysis, and automated notifications.

## **Requirements**

* LoRaWAN Network Server (LNS): Required to receive sensor data and forward it to Thinger.io. Supported servers include The Things Stack, Chirpstack, Loriot, or other LoRaWAN-compliant LNS.
* Deploy a LoRaWAN plugin in Thinger.io: [The Things Stack, Chirpstack and Loriot.](https://docs.thinger.io/lpwan/the-things-stack)

## **Get Started**

### **Configuration**

1. Provide device identifiers and communication parameters.
2. Configure LoRaWAN options as applicable.
3. Save and enable the plugin.

### **Usage**

Once configured, the LHT65N data becomes available as live resources within Thinger.io. Users can:

* Instantly view measurements through dashboards, including real-time temperature, humidity, and battery status.
* Store time-series data in buckets for historical analysis.
* Create alerts for thresholds or anomalies.
* Send downlink commands to the device (change transmission interval, retrieve stored records, request device configuration).
* Integrate measurements with automation workflows and external services.
* Export data to CSV for analysis in external tools.

## **Additional Resources**

* [Dragino LHT65N User Manual v1.3](https://www.dragino.com/downloads/downloads/LHT65/UserManual/LHT65_Temperature_Humidity_Sensor_UserManual_v1.3.pdf)
* [Thinger.io LoRaWAN Documentation](https://docs.thinger.io/lpwan)
* [Thinger.io Dashboards Guide](https://docs.thinger.io/dashboards)
* [Dragino LHT65N Product Page](https://www.dragino.com/products/lora-lorawan-end-node/item/151-lht65.html)
* [Thinger.io Community Forum](https://community.thinger.io/)
* [Dragino Support](https://claude.ai/chat/support@dragino.com)
