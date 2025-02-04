
# LORIOT 

<p align="center">
  <img src="/plugins/loriot/assets/loriot-logo.png" onerror="this.src='https://marketplace.thinger.io/plugins/loriot/assets/loriot-logo.png';this.onerror='';" alt="LORIOT logo">
</p>

LORIOT is a LoRaWAN Network solution that simplifies the deployment of large IoT applications over a collaborative Internet of Things network that spans many countries around the world.

From Thinger.io we wanted to offer an improved integration to LORIOT users by providing easy-to-configure tools for storing, analyzing, and showing device data in a simple way.

This plugins integrates LORIOT messages into Thinger.io platform through the Products feature, allowing the autoprovisioning of devices and data buckets, and the definition of custom uplink and downlink processing functions, as well as the processing of uplink and downlink payloads.

## Getting Started

This plugin requires that devices in LORIOT applications to be of homogeneous type, that is, being of the same type and model, in order to handle autoprovision.

The first step is to install the plugin in your Thinger.io account ([How to install a plugin](https://marketplace.thinger.io/plugins/managing/#install-and-deploy-an-existent-plugin)).

<p align="center">
  <img src="/plugins/loriot/assets/loriot_plugin_marketplace.png" onerror="this.src='https://marketplace.thinger.io/plugins/loriot/assets/loriot_plugin_marketplace.png';this.onerror='';" alt="LORIOT in Thinger.io Marketplace">
</p>

### Plugin Configuration

After installing this plugin, access the plugin configuration page and on the Applications table click on `Add +` to create a new application. You will need to provide the following information:

- **Application Name**: An optional friendly name for the application.
- **Device Id Prefix**: A prefix to be used for the device identifiers. The plugin will automatically append the device EUI to this prefix to create the device identifier. This prefix is necessary for the device autoprovision features.
- **LORIOT Access Token**: The LORIOT Application Access Token. Please refer to the [LORIOT Access Token documentation](https://docs.loriot.io/space/NMS/6031583/Access+Tokens) to learn how to obtain this token.

<p align="center">
  <img src="/plugins/loriot/assets/add_application.png" onerror="this.src='https://marketplace.thinger.io/plugins/loriot/assets/add_application.png';this.onerror='';" alt="Add application modal in LORIOT Thinger.io Plugin">
</p>

Don't close the plugin configuration page yet, you will need to configure the LORIOT Webhook to send the device data to Thinger.io.

<p align="center">
  <img src="/plugins/loriot/assets/loriot_plugin.png" onerror="this.src='https://marketplace.thinger.io/plugins/loriot/assets/loriot_plugin.png';this.onerror='';" alt="LORIOT Thinger.io Plugin Settings">
</p>

 
###  LORIOT Webhook Configuration

To integrate LORIOT with Thinger.io, you need to configure a Webhook in LORIOT to send the device data to Thinger.io. To do this, follow these steps:

1. Access the LORIOT platform and go to the `Applications` section. Select the application you want to integrate with Thinger.io.
2. In the application configuration, go to `Output` and click on `Add new output`.
3. Select `HTTP Push` as the output type and fill out the configuration with the seetings found in the plugin configuration page:

<p align="center">
  <img src="/plugins/loriot/assets/loriot_webhook_settings.png" onerror="this.src='https://marketplace.thinger.io/plugins/loriot/assets/loriot_webhook_settings.png';this.onerror='';" alt="LORIOT Webhook Settings for Thinger.io integration">
</p>

If you [check the logs](https://marketplace.thinger.io/plugins/managing/#analyzing-the-logs) in the LORIOT Thinger.io Plugin, you should see the messages being received from LORIOT. However, the devices are not yet provisioned in Thinger.io, so the messages are being discarded.

Currently only device uplink messages and downlink confirmations are supported, meaning that gateway messages will not be processed.

More information on LORIOT Application Output can be found in the [LORIOT documentation](https://docs.loriot.io/space/NMS/6033171/Application+Outputs).

### Device Templates

Device templates define the device data structure and the processing functions for uplink and downlink messages, as well as dashboards and data buckets.

#### Install a Device Template

In Thinger.io device templates are also plugins, checkout the Plugins Marketplace to find the device template that fits your device. In case you cannot find a device template for your device, you can create your own device template, please refer to section [Create Your Own Device Template](#create-your-own-device-template).

<p align="center">
  <img src="/plugins/loriot/assets/am103_plugin.png" onerror="this.src='https://marketplace.thinger.io/plugins/loriot/assets/am103_plugin.png';this.onerror='';" alt="AM103 Marketplace plugin">
</p>

Once installed, in Products you'll see your new installed device templates. By default the device templates have a predefined prefix, make sure to change it to match the prefix you used when creating the LORIOT application in the plugin.

<p align="center">
  <img src="/plugins/loriot/assets/am103_product_profile.png" onerror="this.src='https://marketplace.thinger.io/plugins/loriot/assets/am103_product_profile.png';this.onerror='';" alt="AM103 Product profile">
</p>

#### Create your own Device Template

You can create your own device template through the Products feature, refer to the [Thinger.io documentation](https://docs.thinger.io/products) to learn how to create a new product.

## LORIOT Documentation

Please refer to the [LORIOT documentation](https://docs.loriot.io/) for more information about the LORIOT platform.

## License

<a href="http://opensource.org/">
  <img style="float: right;" width="100px" height="137px" src="/assets/OSI_Standard_Logo_0.svg">
</a>

The plugin is licensed under the [MIT License](http://opensource.org/licenses/MIT):

Copyright &copy; [Thinger.io](http://thinger.io)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
