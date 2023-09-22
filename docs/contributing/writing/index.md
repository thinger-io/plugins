
# Writing a Plugin

In order to provide a highly extensive system we are working to make it easy for community developers to contribute through Open Source plugins. This section will provide deeply information about the infrastructure that is supporting plugins system and how to build, test and deploy custom ones.

Keep in mind that any plugin installation is still limited by your [Cloud Pricing Plan](https://thinger.io/pricing/).

First of, there are different use cases, depending if we want to integrate an existing service with Thinger.io, if we'd like to develop our own service with or without a frontend and plugins to create default resources for off-the-self hardware (Shelly or Sonnof devices, for example).

Based on this requirement and in other of enumaration, you may go to the section that best suits your needs:

- [Integrating services](integrating-services)
- [Developing custom plugins](developing-custom-plugins)
- [Off-the-shelf hardware integration](off-the-shelf-hardware)

Nevertheless, all of this use cases must follow the [Plugin Structure](/contributing/structure/), but each one of them will use different elements in its `plugin.json` file. Don't forget to familiarize with all the available options first.

Once you have all the necessary files, and before uploading the plugin to the repository, it is useful to test the plugin in your own Thinger.io environment. The instructions on how to test it out are in the [deploying local plugins](deploying-local) section.
