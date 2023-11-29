---
title: Node-RED Plugin Version 1.5.0-1
image: "/announcements/2023-11-16-node-red-v1.5.0-1/node-red-logo.svg"
date: 2023-11-16
authors: [thinger.io]
categories:
  - Node-RED
  - Rules
comments: true
---

# Node-RED Plugin Version 1.5.0-1

<p align="center">
  <img src="/announcements/2023-11-16-node-red-v1.5.0-1/node-red-control-panel.png" onerror="this.src='/announcements/2023-11-16-node-red-v1.5.0-1/node-red-control-panel.png';this.onerror='';" alt="Sample control panel a Node-RED integration with Thinger.io">
</p>

From [Thinger.io](https://thinger.io) we have released a new Node-RED Plugin version with some improvements and fixes.

Between the highlights of this new version, we have added the possibility to filter by tags in the bucket read node, needed feature when using [product buckets](https://docs.thinger.io/business-features/products/product-profile/buckets).

<p align="center">
  <img src="/announcements/2023-11-16-node-red-v1.5.0-1/node-red-bucket-read-tags-form.png" onerror="this.src='/announcements/2023-11-16-node-red-v1.5.0-1/node-red-bucket-read-tags-form.png';this.onerror='';" alt="Bucket Read node form with bucket tags">
</p>

Also available for configuration in the input message:

<p align="center">
  <img src="/announcements/2023-11-16-node-red-v1.5.0-1/node-red-bucket-read-tags.png" onerror="this.src='/announcements/2023-11-16-node-red-v1.5.0-1/node-red-bucket-read-tags.png';this.onerror='';" alt="Bucket Read node tags property documentation">
</p>

It is now possible to add a project to the device and bucket create nodes, extending and replicating the capabilities available in the UI.

<p align="center">
  <img src="/announcements/2023-11-16-node-red-v1.5.0-1/node-red-bucket-create-tags-form.png" onerror="this.src='/announcements/2023-11-16-node-red-v1.5.0-1/node-red-bucket-create-tags-form.png';this.onerror='';" alt="Bucket Create node form with bucket tags">
</p>

Between the fixes, we have made some improvements into the storage read and write nodes.

The full changelog is available [here](https://github.com/thinger-io/node-red-contrib-thinger/releases/tag/1.5.0)

In regards of the underlying Node-RED, we have update it to the last version [3.1.0](https://github.com/node-red/node-red/releases/tag/3.1.0). More information in Node-REDs blog [post](https://nodered.org/blog/2023/09/06/version-3-1-released).

[Checkout the doc for the this plugin](/plugins/node-red/).
