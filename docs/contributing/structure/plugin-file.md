
# Plugin File

This is the main file for every plugin, as it contains all neccesary metadata for its deployment.

The files name is `plugin.json` and follows the `package.json` standard for NPM packages[^package-standard] with additional elements neccesary to describe the build and deployment of the plugins within the [Thinger.io](https://thinger.io) Platform.

## Required content

The most basic content that a `plugin.json` file must contain, its structure and description for each element is

``` json title="plugin.json"
{
  "name" : "<id of the plugin, same as its directory name (lowercase and with hyphens in place of spaces)",
  "version" : "<current production version of the plugin",
  "description" : "<short description of the plugin",
  "author" : "<name or github alias for the integrator of the plugin>",
  "license" : "MIT",
  "repository" : {
    "type" : "git",
    "url" : "https://github.com/thinger.io/plugins.git"
  },
  "metadata" : {
    "name" : "<full name>",
    "description" : "<description of the plugin>",
    "image" : "<image url to display in Thinger.io Marketplace>",
    "icon" : "<icon url to display in Thinger.io sidebar>"
  }
}
```

Of course, based on the deployment and configuration of the plugin there are other available elements that will define how [Thinger.io](https://thinger.io) will handle it.

## Additional configuration

### Tokens

This element will define if any token needs to be created, its name and permissions.
If the plugin is deployed in a Docker container, Thinger.io will pass the token to its environment as `THINGER_TOKEN_<NAME_OF_TOKEN>`.

Below you can find and example, used by the [Sigfox Plugin](/plugins/sigfox/plugin-file/):

``` json title="plugin.json"
{
  "tokens" : {
    "sigfox_plugin" : {
      "name" : "Access from Sigfox plugin to thinger.io account",
      "allow" : {
        "Device" : {
          "*" : ["CreateDevice", "SetDeviceProperty", "ReadDeviceProperty", "UpdateDeviceCallback", "CallDeviceCallback", "ReadDeviceCallbackResponse"]
        },
        "Bucket" : {
          "*" : ["CreateBucket"]
        },
        "Plugin" : {
          "sigfox" : "*"
        }
      }
    },
    "sigfox_plugin_callback" : {
      "name" : "Access from Sigfox network to plugin callback",
      "allow" : {
        "Plugin" : {
          "sigfox" : ["CallPluginEndpoint"]
        }
      }
    }
  }
}
```

Therefore inside the Sigfox environemnt two tokens will exist, `THINGER_TOKEN_SIGFOX_PLUGIN` and `THINGER_TOKEN_SIGFOX_PLUGIN_CALLBACK`.

### Deployment description

Defined by the element `task`, currently only for Docker deployments, this element describes how Thinger.io will launch and configure the environment. It contains details about the docker image to use, the environemt variables inside the container, the volumes attached, copy of configuration files...

The best example in this case is the [Grafana Plugin](/plugins/grafana/plugin-file/):

``` json title="plugin.json"
{
  "task" : {
    "env" : {
      "GF_SERVER_DOMAIN" : "${THINGER_HOST}",
      "GF_SERVER_ROOT_URL": "https://${THINGER_HOST}/users/${THINGER_USER}/plugins/${THINGER_PLUGIN}/",
      "GF_SERVER_SERVE_FROM_SUB_PATH" : "true",
      "GF_SERVER_ENABLE_GZIP" : "true",
      "GF_SECURITY_ADMIN_USER" : "${THINGER_USER}",
      "GF_SECURITY_COOKIE_SECURE" : "true",
      "GF_SECURITY_COOKIE_SAMESITE" : "strict",
      "GF_ANALYTICS_REPORTING_ENABLED" : "false",
      "GF_SECURITY_ALLOW_EMBEDDING" : "true",
      "GF_LOG_MODE" : "console",
      "THINGER_INFLUXDB_TOKEN": "{{THINGER_INFLUXDB_TOKEN}}"
    },
    "type" : "docker",
    "image" : "grafana/grafana:8.5.4",
    "volumes" : [
      {
        "source": "data",
        "target": "/var/lib/grafana",
        "description": "Mount point for user data configuration"
      },
      {
        "source": "datasources",
        "target": "/etc/grafana/provisioning/datasources/",
        "description": "Mount point for preconfigured datasources"
      }
    ],
    "copy": {
      "datasources": "datasources"
    }
  }
}
```

In this case we see different subelements:

- `env`: environment variables passed to the Docker environment.
- `type`: docker.
- `image`: defines the docker image to create the container from. If the version is omitted, it will append the version from the plugin, which corresponds to the `version` element of the `plugin.json` file.
- `volumes`: declares the data volumes that will attach to the container. In this case there are two, `data`, that is used to persist the path `/var/lib/grafana`, in case the container is restarted or updated; and `datasources`, used for preconfiguration files copied to the container.
- `copy`: defines the directory to copy from the [Plugin Structure](/contributing/structure), into the name volume defined in the `volumes` section.

Additional to the plugin defined environment variables, there are Thinger.io defined, that can be used to construct additional variables as shown in the above example, which are:

- THINGER\_HOST
- THINGER\_USER
- THINGER\_PLUGIN
- THINGER\_PLUGIN\_VERSION
- THINGER\_HTTP\_PORT
- THINGER\_HTTP\_SSL\_PORT
- THINGER\_INFLUXDB\_TOKEN

### Thinger.io resources

Besides tokens, any other resources may be declared in the file and the Thinger.io Platform will handle its creation. This can be useful to create for example proxies to different services or additional file storages that, if correctly configured, will then be used by the plugin.

The following example, extracted from the [InfluxDB2 Plugin](/plugins/influxdb2/plugin-file/), creates a Proxy resource against the existing InfluxDB container used as the backend of Thinger.io Platform.

``` json title="plugin.json"
{
  "resources" : {
    "proxies" : [
      {
        "proxy" : "influxdb2_plugin",
        "enabled" : true,
        "name" : "InfluxDB2 Plugin Access",
        "description" : "InfluxDB2 Proxy created by plugin",
        "config" : {
          "protocol" : "tcp",
          "source": {
            "port": 8087,
            "secure": true
          },
          "target": {
            "type": "address",
            "address" : "localhost",
            "port" : 8086,
            "secure" : false
          }
        }

      }
    ]
  }
}
```

In this particular case, a proxy is created from the port 8087 of the Host machine to the port 8086 of the localhost, being able to access externally to the InfluxDB2 dashboard.

Other resources are described under the sections Platform Features and Business Features of the official Thinger.io Platform [documentation](https://docs.thinger.io/).

For specific details on how to declare the resources and details checkout other [plugins](/plugins/) or reach us at Thinger.io [community](https://community.thinger.io/)

### User interface

To be able to see either the web interface of a plugin or the developed interface, it is neccesary to define either the port and name of the container or the GUI file from which to execute.

This first example, proxies from the Thinger.io frontend to the [Node-RED Plugin](/plugins/node-red/plugin-file/):

``` json title="plugin.json"
{
  "interface" : {
    "main" : {
      "proxy_to" : {
        "plugin" : "node-red",
        "port" : 1880,
        "rewrite_base_path": true
      }
    }
  }
}
```

The second example, opens the frontend from an in-house development based in Angular, in particular for the [TTN-Stack Plugin](/plugins/ttn-stack/plugin-file/):

``` json title="plugin.json"
{
  "interface" : {
    "main" : {
      "file" : "gui/ttn-stack-settings.js"
    }
  }
}
```

[^package-standard]: [https://docs.npmjs.com/cli/v9/configuring-npm/package-json](https://docs.npmjs.com/cli/v9/configuring-npm/package-json)
