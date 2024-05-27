---
title: Prometheus Exporter Plugin Version 1.2.0-1
image: "/announcements/2024-05-27-prometheus-exporter-v1.2.0-1/prometheus-logo.svg"
date: 2024-05-27
authors: [thinger.io]
categories:
  - Prometheus
  - Monitoring
  - Alerting
comments: true
---

# Prometheus Exporter Plugin Version 1.2.0-1

We are very glad to announce that the Prometheus Exporter Plugin has been updated to version 1.2.0-1. This new version includes the following changes:

- Added cache for metrics endpoints, improving the performance of the retrieval when multiple prometheus servers are querying the endpoint
- Added retrieval of metrics sequentially or in parallel, optimizing the performance of the queries to the underlying database
 
<p align="center">
  <img src="/announcements/2024-05-27-prometheus-exporter-v1.2.0-1/settings.png" onerror="this.src='/announcements/2024-05-27-prometheus-exporter-v1.2.0-1/settings.png';this.onerror='';" alt="Prometheus exporter settings UI">
</p>

<p align="center">
  <img src="/announcements/2024-05-27-prometheus-exporter-v1.2.0-1/query.png" onerror="this.src='/announcements/2024-05-27-prometheus-exporter-v1.2.0-1/query.png';this.onerror='';" alt="Prometheus web UI integrated into Thinger.io Platform">
</p>

[Checkout the doc for the this plugin](/plugins/prometheus-exporter/).
