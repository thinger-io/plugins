
# Configuration Files

In order for a plugin to work, additional configuration may be neccesary, to describe for example, the user id to use in the environment, the base url or any other setting specific to the plugin.

The way to add plugin specific configuration is to create a directory, with any name, inside the [Plugin Structure](/contributing/structure/), containing the files that are to be used by the plugin. Then in the [Plugin File](/contributing/structure/plugin-file/), declare the volume to mount and the path to mount it to. More information under the [deployment description](/contributing/structure/plugin-file/#deployment-description) of the Plugin File.

If after developing a Plugin the GUI it is not shown it may be due to additional configuration in the integrated service.

Two good examples to review are:

### Grafana Plugin Datasources
The [Grafana Plugin](https://github.com/thinger-io/plugins/tree/main/grafana) includes the default datasources to connect to the InfluxDB2 instance used by the Thinger.io Platform.

### Jupyter Minimal Plugin Configuration
The [Jupyter Minimal Plugin](https://github.com/thinger-io/plugins/tree/main/jupyter-minimal) includes the necessary configuration of the server included in the Jupyter Docker Image in order for it to work with the Thinger.io Platform.
