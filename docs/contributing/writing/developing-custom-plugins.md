
# Developing Custom Plugins

A plugin may be self-contained, meaning that everything from the back-end, front-end and integration with Thinger.io is include in its own plugin directory.

An example of this type of plugin would be the [TTN-Stack Plugin](https://github.com/thinger-io/plugins/tree/main/ttn-stack), which is developed in Node.js for the back-end and Angular for the front-end.

## Back-end

To develop the backend, any technology may be used as long as it is able to run under a Docker container.

Under a directory called `task`, include the source code and any file necessary for the build and execution of the server, as well as the Dockerfile, with the CI system will use to generate the image for the plugin.

Checkout this [example](https://github.com/thinger-io/ttn-stack-plugin/tree/master/task).

## Front-end

If the front-end is not integrated inside the container, where the back-end is located, a front-end may be developed with [Angular](https://angular.io/) and placed under a directory called `gui`.

Checkout this [example](https://github.com/thinger-io/ttn-stack-plugin/tree/master/gui).

## Thinger.io integration

The integration with Thinger.io Marketplace would be very similar or the same as any other plugin under the [integrating services](/contributing/writing/integrating-services/) section, only in the case that the GUI is developed outside the container the [user interface](/contributing/structure/plugin-file/#user-interface) section must refer to the Angular `settings.js` file.
