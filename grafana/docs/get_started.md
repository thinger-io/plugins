---
title: Get Started
layout: page
description: Get Started with Grafana Plugin
parent: Grafana
grand_parent: Plugins
nav_order: 1
permalink: /plugins/grafana/:basename/
---

# Getting Started with Grafana Plugin

After completing the standard plugin deployment process ([as explained here)](/managing_plugins/), the Grafana plugin requires a few additional steps to work seamlessly with thinger.io devices' data. In the following sections, we'll guide you through the login process and how to configure the plugin effectively.
First Login

## First Login

Upon installing the plugin, perform the initial login using your thinger.io account username and the password `admin`. After the first login, the system will prompt you to change the password to a custom one. Once done, you'll gain access to the Grafana workspace, offering a variety of options.

<p align="center">
  <img src="/grafana/assets/login.png" alt="Grafana login prompt">
</p>

## Adding a Datasource

The connection between Thinger.io data and the Grafana plugin is established by adding the buckets database as a `new data source` for Grafana. By default, the configuration for the database is set up with names InfluxDB2-Flux and InfluxDB2-InfluxQL, requiring no further action.

{: .note}
For better performance, it is recommended to use the InfluxQL backend unless you require specific features available only with Flux.

<p align="center">
  <img src="/grafana/assets/influxdb-datasource.png" alt="Grafana backends configuration">
</p>

However, if needed, you can configure additional data sources. For more information, check [this link](https://grafana.com/docs/grafana/latest/datasources/).
