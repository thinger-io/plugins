# InfluxDB2 Plugin 

<img src="https://s3.eu-west-1.amazonaws.com/thinger.io.files/plugins/influxdb2/influxdb.svg" alt="Grafana Logo" width="200"/>

InfluxDB is an open source time series platform. This includes APIs for storing and querying data, processing it in the background for ETL or monitoring and alerting purposes, user dashboards, and visualizing and exploring the data and more.

InfluxDB is the default database backend for Thinger.io. This plugin allows direct access to the underlying installation and the user buckets for custom queries, dashboards, or alerts.

![image](https://discoursefiles.s3.dualstack.eu-west-1.amazonaws.com/optimized/2X/b/b9181507304f07b8a3499e1079384c5e435ab1a3_2_836x750.jpeg)

## Requirements

- This plugin requires an instance with support for creating Proxies. Check your host admin in case of doubt.
- Proxies can be only initialized by admins. If a regular tenant (developer role) requires this plugin, please, ensure the admin also has this plugin installed to enable the required proxy.

## Resources initialization

This plugin initializes the following resources

- TCP Proxy from 8087 (secure) to localhost at 8086.

## Get Started

After the plugin is installed, click on the InfluxDB2 plugin and access the interface with you regular Thinger.io username and password.

Note: If the username and password does not work, please, change your Thinger.io password account.

## License

InfluxDB is distributed under the [MIT License](https://github.com/influxdata/influxdb/blob/master/LICENSE).
