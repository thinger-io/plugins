
# VS Code

![Thinger.io web console with VS Code plugin and OTA upload](assets/laptop-mockup.png)

The Thinger.io VS Code Plugin enables users to edit software files on the cloud using a fully-featured Integrated Development Environment (IDE) powered by Visual Studio Code (VS Code). This plugin also facilitates the coding of complete software and allows Over-The-Air (OTA) updates for microcontrollers directly from the cloud.

## About Thinger.io and VS Code integration

Thinger.io cloud platform offers a VS Code plugin based on Code-Server. This integration allows you to seamlessly edit any file uploaded into Thinger.io using a powerful IDE. Additionally, you can conveniently update microcontrollers via OTA directly from the cloud.

The plugin comes pre-installed with the complete setup of PlatformIO and the [Thinger.io extension](https://marketplace.visualstudio.com/items?itemName=thinger-io.thinger-io), making it effortless to get started with your projects.

![VS Code OTA update for ESP32](assets/iot-ota.gif)

Furthermore, when accessing the [File Storages](https://docs.thinger.io/file-system) in Thinger.io's web console, the platform detects the presence of VS Code and adds a convenient shortcut to open the storage inside the VS Code Plugin.

![VS Code file storage shortcut](assets/storage-shortcut.png)

> [!NOTE]
> Please note that the Thinger.io VS Code Plugin is available only for premium
> Thinger.io servers, from Medium subscription and upwards. You can check
> [**this link**](https://thinger.io/pricing) to create your own instance within minutes.

## OTA Support

The plugin supports OTA updates for a wide range of devices. For the latest information on OTA programming, please refer to the [OTA Programming page](https://docs.thinger.io/extended-features/ota). To utilize OTA updates, it is necessary to initially upload an OTA compatible firmware to a device using a native IDE with options available for [Arduino IDE](https://docs.thinger.io/sdk-setup/arduino-ide) or [Visual Studio Code](https://docs.thinger.io/sdk-setup/visual-studio-code).
