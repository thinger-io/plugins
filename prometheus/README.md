---
title: Prometheus
layout: page
description: Plugin for systems monitoring and alerting within Thinger.io
parent: Plugins
has_children: true
permalink: /plugins/:path/
---

# Prometheus

<p align="center">
  <img alt="Prometheus logo" src="https://raw.githubusercontent.com/prometheus/prometheus/main/documentation/images/prometheus-logo.svg">
</p>

Enhance your monitoring capabilities with the Thinger.io Prometheus Integration. This integration enables you to effectively monitor and alert systems within Thinger.io, providing comprehensive insights into system health and performance.
By utilizing both the [Prometheus Exporter Plugin](https://marketplace.thinger.io/plugins/prometheus_exporter/) and the Prometheus Server Plugin, you gain the ability to assess the status of Thinger.io and its resources through database queries. Moreover, this integration extends its functionality to enable monitoring of external systems.

## Get Started

When installing the Prometheus Plugin, a new file storage is created called 'Prometheus Settings'. This file storage contains a template of the configuration in order to scrape the [Prometheus Exporter Plugin](https://marketplace.thinger.io/plugins/prometheus-exporter) endpoint.

In order for the connection to take place, edit the file by introducing your details and restart the plugin.

This file can also be used to configure external systems scraping.

{: .note}
Check out also the [Alertmanager plugin](https://marketplace.thinger.io/plugins/alertmanager)

<p align="center">
  <img src="https://marketplace.thinger.io/prometheus/assets/query.jpg" alt="Prometheus integration showing a query over devices_total in Thinger.io">
</p>

## Integration with Grafana

Grafana provides native support for Prometheus, therefore, we can configure a connection between the two plugins.

{: .note}
Refer to the [Grafana plugin page](https://marketplace.thinger.io/plugins/grafana) if you need more details on how to get started

Once grafana in installed and logged in, you may go to 'Settings'->'Data sources'. Click on `Add data source` and click on 'Prometheus'.
The data to configure the Prometheus as data source you'll need:
- URL: http://<thinger\_user>-prometheus:9090/users/<thinger\_user>/plugins/prometheus

And thats it, you may start now creating dashboard in grafana with prometheus as the backend.

<p align="center">
  <img src="https://marketplace.thinger.io/prometheus/assets/grafana-dashboard.jpg" alt="Prometheus integration showing a devices_total dashboard in Grafana">
</p>

## Official Documentation

The Prometheus documentation is available at [prometheus.io/docs](https://prometheus.io/docs/introduction/overview/).

More details regarding the configuration of Prometheus at [this link](https://prometheus.io/docs/prometheus/latest/configuration/configuration/).

{: .note}
Any configuration change in `prometheus.yml` requires a restart of the Prometheus plugin.

## License
Prometheus is distributed under the [Apache 2.0 License](https://prometheus.io/docs/introduction/faq/#what-license-is-prometheus-released-under).
