## Sigfox

Thinger.io plugin for handling Sigfox integration.

<img src="https://user-images.githubusercontent.com/1141353/58571038-5017e200-8239-11e9-86f4-de1f0922d199.png" width="250px">

### Plugin features

* Auto device and buckets provisioning. It can create new devices and data buckets for all new devices sending data to the Sigfox network.
* Insert new data points in the corresponding data bucket.
* Update device location in the console if "latitude" and "longitude" fields are set in the callback call.

### Sigfox Integration

It is mandatory to send the device in the callback payload. Other optional values are signal or location information extracted from Sigfox. 

```json
 {
    "device" : "{device}",
    "snr" : {snr},
    "rssi" : {rssi},
    "station": "{station}",
    "latitude": {lat},
    "longitude": {lng},
    "temperature" : {customData#temp},
    "humidity" : {customData#hum}
 }
```