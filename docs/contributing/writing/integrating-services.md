
# Integrating Services

Third-party service integration is one of the main objectives of the Thinger.io Marketplace, therefore the Plugin System is built around this use case.

Most commonly, the service will be deployed in a Docker container and the Thinger.io Platform will reverse proxy its access to be able to see the front-end, if available.

There may some cases in which the service does now allow its deployment behind a reverse proxy, for this causistica, Thinger.io implements proxies, that open a port on the Host machine pointing to the service.

Ideally, the former way is the first approach that every plugin should follow, as it does not modify the hosts network infrastructure.

In the [Plugin Structure](/contributing/structure/) section is described the neccesary files to integrate a service. Specifically, check out [deployment description](/contributing/structure/plugin-file/#deployment-description) and [user interface](/contributing/structure/plugin-file/#user-interface) sections under Plugin File for specifics in how to deploy a Docker service; and [Dockerfile](/contributing/structure/dockerfile/) for details in how to add additional functionality or add-ons to Docker images.

Examples of integration of services are the [Grafana Plugin](https://github.com/thinger-io/plugins/tree/main/grafana) and [Jupyter Minimal Plugin](https://github.com/thinger-io/plugins/tree/main/jupyter-minimal); and an example with extending features would be the [Node-RED Plugin](https://github.com/thinger-io/plugins/tree/main/node-red).
