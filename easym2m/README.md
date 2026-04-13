# EasyM2M Plugin

<p align="center">
  <img src="assets/easym2m_logo.png" alt="EasyM2M Logo" width="200"/>
</p>

The EasyM2M plugin integrates [EasyM2M](https://www.easym2m.eu/) NB-IoT SIM card management directly into [Thinger.io](https://thinger.io). It provides a unified interface to monitor and inspect all SIM cards associated with your EasyM2M account, without leaving the Thinger.io console.

## Purpose

EasyM2M is a connectivity provider specializing in NB-IoT SIM cards for IoT deployments. This plugin bridges the EasyM2M Management API with Thinger.io, allowing operators to oversee their SIM fleet alongside their devices and data pipelines from a single platform.

## Features

**SIM Card Inventory** — Browse your full SIM card fleet with paginated, filterable listings. Each entry shows the ICCID, alias, current status, IP address, and connectivity state at a glance.

**Detailed SIM Inspection** — Click any SIM to open a detail panel covering identity fields (ICCID, IMSI, MSISDN, IMEI), network and connectivity data (APN, IP, GPRS status, geolocation), sensitive data (PIN/PUK, reveal on demand), and any additional fields returned by the API.

**Status Filtering** — Quickly narrow down the list by SIM status (active, suspended, deactivated, etc.) to focus on specific subsets of your fleet.

**Settings Management** — Store your EasyM2M API credentials (Client ID, Password, and API Key) securely within the plugin. Credentials are validated on save and can be updated at any time.

## Setup

1. Install the plugin from the Thinger.io Marketplace.
2. Open the **Settings** tab and enter your EasyM2M API credentials: Client ID, Password, and API Key. These are available from your EasyM2M account portal.
3. Once saved, navigate to the **SIM Cards** tab to see your fleet.

## Requirements

- A Thinger.io account with plugin support enabled.
- An active EasyM2M account with API access credentials.
