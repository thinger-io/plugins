---
title: The Things Network (TTN) Plugin Version 1.0.0-1
image: "/announcements/2025-07-11-ttn-v1.0.0-1/ttn-logo.png"
date: 2025-07-11
authors: [thinger.io]
categories:
  - TTN
  - LoRaWAN
  - LNS
  - Integrations
comments: true
---

# The Things Network Plugin Version 1.0.0

We are pleased to announce the official **TTN Plugin for Thinger.io**.  
This release deploys a **self-managed Docker service** that exposes a dedicated API for processing webhook traffic from *The Things Network* and translating it into native Thinger (ready-configured) resources.

<p align="center">
  <img src="/announcements/2025-07-11-ttn-v1.0.0-1/ttn-dashboard.png" alt="TTN Plugin dashboard in Thinger.io">
</p>

## Key functionality

* **One-click provisioning**  
  Installs a fully-configured *Service*, ready to use along a prebuilt product plugin, such as the [Dragino LT22222L](/plugins/dragino-lt22222l/).

* **Managed Docker runtime**  
  The connector runs as a Thinger **Service**; logs, health checks, restart policies, and image updates are handled through the standard **Services** panel.

* **Webhook plugin for TTN**  
  A ready-to-use TTN integration (`thinger-webhook`) is published in the TTN Console.  
  Users simply select the webhook template, and start streaming data with no manual JSON transformations required.

* **Payload parsing & resource mapping**  
  Uplink messages (v3 `uplink_message` format) are parsed by the connector API and mapped to Thinger **device resources**.
  Downlink acknowledgements and join events can also be captured.

* **Secure downlink endpoint**  
  Every device inherits a `downlink` resource that invokes the connector’s REST API to enqueue messages back to TTN, respecting **FPort**, confirmation flags, and payload length limits.


### Documentation

[TTN Plugin Documentation](/plugins/ttn/).