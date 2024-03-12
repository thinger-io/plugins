---
title: Node-RED Plugin Version 1.7.0-1
image: "/announcements/2024-03-11-node-red-v1.7.0-1/node-red-logo.svg"
date: 2024-03-11
authors: [thinger.io]
categories:
  - Node-RED
  - Rules
comments: true
---

# Node-RED Plugin Version 1.7.0-1

<p align="center">
  <img src="/announcements/2024-03-11-node-red-v1.7.0-1/node-red-control-panel.png" onerror="this.src='/announcements/2024-03-11-node-red-v1.7.0-1/node-red-control-panel.png';this.onerror='';" alt="Sample control panel a Node-RED integration with Thinger.io">
</p>

From [Thinger.io](https://thinger.io) we have released a new Node-RED Plugin version with some improvements and fixes, hoping to resolve some bugs and make flows easier.

One of the most useful features of this new version is the possibility to use the input message properties through the nodes configuration forms via templates, avoiding the need to use functions or change nodes before concatenating thinger nodes. For example, to call a resource of a device, we can do the following, given that the input message contains a property `id` and property `resource`:

<p align="center">
  <img src="/announcements/2024-03-11-node-red-v1.7.0-1/node-red-input-configuration.png" onerror="this.src='/announcements/2024-03-11-node-red-v1.7.0-1/node-red-input-configuration.png';this.onerror='';" alt="Device Read input configuration through templates">
</p>

This functionality is available for all Thinger.io nodes that allow input messages. More information for each individual node can be found in Node-RED node documentation.

<p align="center">
  <img src="/announcements/2024-03-11-node-red-v1.7.0-1/node-red-node-documentation.png" onerror="this.src='/announcements/2024-03-11-node-red-v1.7.0-1/node-red-node-documentation.png';this.onerror='';" alt="Device Read node documentation">
</p>

Given this new feature, the endpoint call node can now configure its payload through the configuration form:

<p align="center">
  <img src="/announcements/2024-03-11-node-red-v1.7.0-1/node-red-endpoint-call-node.png" onerror="this.src='/announcements/2024-03-11-node-red-v1.7.0-1/node-red-endpoint-call-node.png';this.onerror='';" alt="Device Endpoint call node configuration form">
</p>

The Asset Iterator node can now filter also assets based on assigned products.

<p align="center">
  <img src="/announcements/2024-03-11-node-red-v1.7.0-1/node-red-product-filter.png" onerror="this.src='/announcements/2024-03-11-node-red-v1.7.0-1/node-red-product-filter.png';this.onerror='';" alt="Asset Iterator node product filter">
</p>

Additionally, now the request against the Thinger.io sevice has a configuration timeout, with a default of 30 seconds.

<p align="center">
  <img src="/announcements/2024-03-11-node-red-v1.7.0-1/node-red-server-timeout.png" onerror="this.src='/announcements/2024-03-11-node-red-v1.7.0-1/node-red-server-timeout.png';this.onerror='';" alt="Thinger.io server node input configuration">
</p>

We welcome everyone to interact with us through our community at [community.thinger.io](community.thinger.io) as well as from this extensionss [GitHub repository](https://github.com/thinger-io/node-red-contrib-thinger)

The full changelog is available [here](https://github.com/thinger-io/node-red-contrib-thinger/releases/tag/1.7.0)

[Checkout the doc for the this plugin](/plugins/node-red/).
