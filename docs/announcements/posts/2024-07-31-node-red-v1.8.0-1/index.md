---
title: Node-RED Plugin Version 1.8.0-1
image: "/announcements/2024-07-31-node-red-v1.8.0-1/node-red-logo.svg"
date: 2024-08-31
authors: [thinger.io]
categories:
  - Node-RED
  - Rules
comments: true
---

# Node-RED Plugin Version 1.8.0-1

<p align="center">
  <img src="/announcements/2024-03-11-node-red-v1.7.0-1/node-red-control-panel.png" onerror="this.src='/announcements/2024-03-11-node-red-v1.7.0-1/node-red-control-panel.png';this.onerror='';" alt="Sample control panel a Node-RED integration with Thinger.io">
</p>

To start August off on a good note, we're excited to announce the release of Node-RED Plugin version 1.8.0-1, with some improvements and fixes to make flows easier and more efficient.

The highlights of this new version include:

- New node to export data from a bucket, allowing users to easily extract data from Thinger.io for further analysis, storage o forwading to other services.

<p align="center">
  <img src="/announcements/2024-07-31-node-red-v1.8.0-1/node-red-bucket-export.png" onerror="this.src='/announcements/2024-07-31-node-red-v1.8.0-1/node-red-bucket-export.png';this.onerror='';" alt="Node-RED bucket export example">
</p>

- UI assets filtering through THINGER_PROJECT environment variable in flow, subflow and group context, enabling users to filter assets when configuring the node based on a thinger project.
 
<p align="center">
  <img src="/announcements/2024-07-31-node-red-v1.8.0-1/node-red-project-filter1.png" onerror="this.src='/announcements/2024-07-31-node-red-v1.8.0-1/node-red-project-filter1.png';this.onerror='';" alt="Node-RED UI asset filtering based on project">
  <img src="/announcements/2024-07-31-node-red-v1.8.0-1/node-red-project-filter2.png" onerror="this.src='/announcements/2024-07-31-node-red-v1.8.0-1/node-red-project-filter2.png';this.onerror='';" alt="Node-RED UI asset filtering based on project">
</p>

- Update to Node-RED version 4.0.2 with Node.js 20. **Note that some dependencies may not be compatible with this version of Node.js**.

- Other general improvements and fixes to enhance the user experience.

[Checkout the doc for the this plugin](/plugins/node-red/).
