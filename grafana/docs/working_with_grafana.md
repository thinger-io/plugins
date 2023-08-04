---
title: Working with Grafana
layout: page
description: Build the first dashboard in the plugin
parent: Grafana
grand_parent: Plugins
nav_order: 2
permalink: /plugins/grafana/:basename/
---

# Working with Grafana

## Creating a New Dashboard

Once the data source is set up, the most common way to work with Grafana is by creating a new dashboard for data representation. Click on the "+" button in the Grafana main menu and select "New Dashboard". This opens an empty dashboard ready to be configured with custom layout and representation panels. Click on "+Add new panel" to open the panel configuration context, organized in two sections:

* **Panel Configuration**: Choose the type of graph to be used, such as time series charts, and explore various options for legends, axes, and more.

<p align="center">
  <img src="/grafana/assets/panel_configuration.png" alt="Grafana panel configuration">
</p>

* **Data Configuration in InfluxQL**: Select the data source (InfluxDB2-InfluxQL in our example), a data bucket profile from Thinger.io, and specific variables for the panel.

<p align="center">
  <img src="/grafana/assets/data_configuration_influxql.png" alt="Data Configuration in influxQL">
</p>

* **Data Configuration in Flux**: Select the data source (InfluxDB2-Flux in our example) and write the desired data using [Flux syntax](https://docs.influxdata.com/influxdb/v2.6/query-data/get-started/)

<p align="center">
  <img src="/grafana/assets/data_configuration_flux.png" alt="Data Configuration in Flux">
</p>

* **Transform data**: Filter or aggregate device data using different tools before displaying it in the panel.

* **Automatic Alerts**: Configure the graph to generate real-time alerts based on evaluated variables.

## Adding New Widget Types

Grafana is highly flexible, allowing users to add new panels and retrieve them from different repositories. These panels are developed by the Grafana team and community contributors, enabling rapid growth. To add new elements in the Thinger.io Grafana Plugin, use the command console of the local Docker container where Grafana is running. Execute the appropriate CLI installation command obtained from the [official Grafana plugin repository](https://grafana.com/grafana/plugins).

## Share Grafana Projects Publicly

Grafana can be configured to create collaborative working groups for sharing resources with read-only or editing privileges. This feature is valuable for creating visualization interfaces for customers. To implement this:

1. Go to the "Permissions" section of the dashboard you want to share and click the blue "Add permission" button.

2. Select the user or team with whom you want to share the dashboard.

3. Choose the desired privileges to grant.

<p align="center">
  <img src="/grafana/assets/permissions.png" alt="Grafana dashboard permissions">
</p>

However, when Grafana is running as a Thinger.io plugin, it is neccesary to give public access to the plugin as explained in the sercion "Giving Public Access" at the [managing plugins page](/managing-plugins)
