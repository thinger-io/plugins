---
title: Siemens LOGO! Plugin Version 1.0.0-1
image: "/announcements/2025-06-24-siemens-logo-v1.0.0-1/logo-plc.svg"
date: 2025-06-24
authors: [thinger.io]
categories:
  - Siemens
  - PLC
  - Industry
comments: true
---

# Siemens LOGO! Plugin Version 1.0.0-1

In the ever-evolving landscape of IoT, the ability to integrate diverse devices and platforms easily is crucial for building robust and flexible systems.

Today, we’re excited to highlight the potential of integrating Siemens LOGO! with Thinger.io through MQTT, enabling users to take advantage of the strengths of both platforms to create powerful IoT solutions.

Siemens LOGO! is a highly versatile logic module known for its simplicity, flexibility, and reliability. Widely used in industrial automation, building control, and various other applications, Siemens LOGO! allows for easy implementation of control tasks without requiring extensive programming knowledge.

From Thinger.io we've developed the template for connecting and auto provisioning Siemens LOGO! logic modules directly with the platform, providing a non-blank start for the final configuration of the project.

The plugin provides a first step to be able to integrate a fleet of Siemens LOGO! controllers, while allowing the ad-hoc configuration that best suits the user's needs.

It provides the following settings:

- A **device_information** property, that will be used to set the device information manually (firmware version, serial number, etc).
- A **shadow** property, that will be used to store the current state of the device.
- A **siemens_logo** data bucket, that will be used to store the data sent by the Siemens LOGO! controller.
- A **up** and **down** device resources, to control the Siemens LOGO! controller.
- An **autoprovision** rule, that will be used to create the device in the Thinger.io platform automatically.
- Basic **product functions** to parse the shadow of the device and handling sending commands to the Siemens LOGO! controller.
- A preconfigured **dashboard** to visualize relevant data of each Siemens LOGO! controller.

<p align="center">
  <img src="/announcements/2025-06-24-siemens-logo-v1.0.0-1/product_profile.png" onerror="this.src='/announcements/2025-06-24-product-profile-v1.0.0-1/product_profile.png';this.onerror='';" alt="Siemens LOGO! Thinger.io product profile">
</p>

[Checkout the doc for the this plugin](/plugins/siemens-logo/).
