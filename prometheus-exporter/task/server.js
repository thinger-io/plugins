'use strict';

// initialize from environment variables
const HOST = process.env.THINGER_HOST;
const HTTP_PORT = process.env.THINGER_HTTP_PORT || 80;
const HTTP_SSL_PORT = process.env.THINGER_HTTP_SSL_PORT || 443;
const USER = process.env.THINGER_USER;
const PLUGIN = process.env.THINGER_PLUGIN;
const VERSION = process.env.THINGER_PLUGIN_VERSION;
const TOKEN = process.env.THINGER_TOKEN_PROMETHEUS_EXPORTER_PLUGIN;

const express = require('express');
const app = express();
app.use(express.json());

// running variables
let settings = {};
const registries = new Map();

const thinger = require('./api');
thinger.configure(HOST, HTTP_PORT, TOKEN, USER, PLUGIN);

const promClient = require('./metrics');

// Load plugins properties
async function buildMetrics() {

  // Create one registry per config
  for ( let cfg in settings ) {

    let register;
    if ( registries.has(cfg) ) {
      register = registries.get(cfg);
      promClient.clearRegistry(register);
    } else {
      register = promClient.createRegistry();
      registries.set(cfg, register);
    }

    // Generate dynamic metrics
    if ( settings[cfg].enabled ) {
      const metrics = settings[cfg].metrics;

      metrics.forEach( metric => {
        if ( ! metric.enabled ) return;
        promClient.generateMetric( register, metric );
      });

    } else {
      promClient.clearRegistry(register);
    }

  }

}

app.get('/:cfg/metrics', async (req, res) => {

      const cfg = req.params.cfg;

      if ( ! registries.has(cfg) )
        return res.status( 404 ).send( `${ cfg } configuration not found` );

      if ( ! settings[cfg].enabled )
        return res.status( 403 ).send( `${ cfg } configuration is disabled` );

      try {
        const register = registries.get(cfg);
        res.setHeader('Content-Type', register.contentType);
        res.send(await register.metrics());
      } catch ( err ) {
        res.status( 500 ).send( err );
      }
});

app.get('/:cfg/metrics/:metric', async (req, res) => {

  const cfg = req.params.cfg;
  const metric = req.params.metric;

  if ( ! registries.has(cfg) )
    res.status( 404 ).send( `${ cfg } configuration not found` );

  try {
    const register = registries.get(cfg);
    res.setHeader('Content-Type', register.contentType);
    res.send(await register.getSingleMetric(metric));
  } catch ( err ) {
    res.status( 500 ).send( err );
  }

});

app.post('/metrics/test', async (req, res) => {

  const metric = req.body; // Get body

  try {

    // Create registry
    const register = promClient.testMetric( metric );

    // Send response
    res.setHeader('Content-Type', register.contentType);
    res.send(await register.metrics());
  } catch ( err ) {
    console.error( err );
    res.status( 500 ).send( err.message );
  }
});

app.put('/settings', function (req, res) {
  settings = req.body;
  try {
    buildMetrics();
    res.send();
  } catch ( err ) {
    console.error( err );
    res.status( 500 ).send( err.message );
  }
});

function launchServer() {

  function startServer() {
    app.listen(3000, function() {
      console.log('Prometheus Thinger Exporter Plugin is now running with the following configuration:');
      console.log("HOST=" + HOST);
      console.log("HTTT_PORT=" + HTTP_PORT);
      console.log("HTTP_SSL_PORT=" + HTTP_SSL_PORT);
      console.log("TOKEN=" + TOKEN);
      console.log("USER=" + USER);
      console.log("PLUGIN=" + PLUGIN);
      console.log("VERSION=" + VERSION);

    });
  }

  thinger.getPluginPropertyValue('settings').then(function (response) {

    settings = response;

    buildMetrics();

    startServer();

  }).catch(function(err) {
    console.error( err.message );

    setTimeout( launchServer, 15*1000 );
  });

}

launchServer();
