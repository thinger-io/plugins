'use strict';

// Imports
const Log = require('./lib/utils/log.js');
const Time = require('./lib/utils/time.js');
const { performace } = require('node:perf_hooks');

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

    // calculate cache interval value in milliseconds beforehand
    if ( settings[cfg].cache_interval && settings[cfg].cache_interval.value !== 0 )
      settings[cfg].cache_interval.millis = Time.toMilliseconds(settings[cfg].cache_interval.value, settings[cfg].cache_interval.magnitude);

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
        promClient.generateMetric( cfg, register, metric );
      });

    } else {
      promClient.clearRegistry(register);
    }

  }

}

/*
  This function is meant to substitute the registry.metrics() function, which executes
  the metric collection in parallel. This function executes the metric collection sequentially.
 */
async function collectMetricsSequential(registry) {
  const isOpenMetrics =
    registry.contentType === registry.OPENMETRICS_CONTENT_TYPE;

  let metricsArray = registry.getMetricsAsArray();
  let results = [];
  for (let metric of metricsArray) {
    if (isOpenMetrics && metric.type === 'counter') {
      metric.name = registry.standardizeCounterName(metric.name);
    }
    let result = await registry.getMetricsAsString(metric);
    results.push(result);
  }

  return isOpenMetrics
    ? `${results.join('\n')}\n# EOF\n`
    : `${results.join('\n\n')}\n`;
}


app.get('/:cfg/metrics', async (req, res) => {

  const t0 = performance.now();

  const cfg = req.params.cfg;

  Log.info(`[cfg: ${ cfg }] metrics endpoint called`);

  if ( ! registries.has(cfg) )
    return res.status( 404 ).send( `${ cfg } configuration not found` );

  if ( ! settings[cfg].enabled )
    return res.status( 403 ).send( `${ cfg } configuration is disabled` );

  try {
    const register = registries.get(cfg);

    let metrics;
    if ( typeof settings[cfg].metricsCache !== "undefined" && Date.now() - (settings[cfg].cache_interval.lastTs || 0) < (settings[cfg].cache_interval.millis ) ) {
      // retrieve value from cache
      metrics = settings[cfg].metricsCache;
      Log.debug(`[cfg: ${ cfg }] Metrics retrieved from cache`);
    } else {

      // Execute collection in parallel or sequentially
      if ( typeof settings[cfg].async === 'undefined' || settings[cfg].async ) {
        Log.info(`[cfg: ${ cfg }] metrics retrieval in parallel`);
        metrics = await register.metrics();
      } else {
        Log.info(`[cfg: ${ cfg }] metrics retrieval sequentially`);
        metrics = await collectMetricsSequential(register);
      }

      // Saving metrics in cache
      if ( typeof settings[cfg].cache_interval !== "undefined" && settings[cfg].cache_interval.value !== 0 ) {
        settings[cfg].cache_interval.lastTs = Date.now();
        settings[cfg].metricsCache = metrics;
      }

    }
    const t1 = performance.now();
    Log.debug(`[cfg: ${ cfg }] metrics retrieval took ${ t1 - t0 } milliseconds`);

    res.setHeader('Content-Type', register.contentType);
    res.send(metrics);

  } catch ( err ) {
    res.status( 500 ).send( err );
    Log.error(`[cfg: ${ cfg }] failed retrieving metrics: ${ err }`);
  }
});

app.get('/:cfg/metrics/:metric', async (req, res) => {

  const t0 = performance.now();

  const cfg = req.params.cfg;
  const metric = req.params.metric;

  Log.info(`[cfg: ${ cfg }, metric: ${ metric }] retrieval`);

  if ( ! registries.has(cfg) )
    res.status( 404 ).send( `${ cfg } configuration not found` );

  try {
    const register = registries.get(cfg);
    const singleMetric = await register.getSingleMetric(metric);
    const t1 = performance.now();

    res.setHeader('Content-Type', register.contentType);
    res.send(singleMetric);

    Log.debug(`[cfg: ${ cfg }, metric: ${ metric }] metric retrieval took ${ t1 - t0 } milliseconds`);

  } catch ( err ) {
    res.status( 500 ).send( err );
    Log.error(`Failed getting retrieving ${ metric } of ${ cfg } configuration: ${ err }`);
  }

});

app.post('/metrics/test', async (req, res) => {

  const t0 = performance.now();

  const metric = req.body; // Get body

  Log.info(`[metric: ${ metric.name }] testing query`);

  try {

    // Create registry a get metrics
    const register = promClient.testMetric( metric );
    const metrics = await register.metrics();
    const t1 = performance.now();

    // Send response
    res.setHeader('Content-Type', register.contentType);
    res.send(metrics);

    Log.debug(`[metric: ${ metric.name }] test metric took ${ t1 - t0 } milliseconds`);

  } catch ( err ) {
    res.status( 500 ).send( err.message );
    Log.error(`[metric: ${ metric.name }] failed test metric: ${ err }`);
  }
});

app.put('/settings', function (req, res) {
  settings = req.body;

  try {
    buildMetrics();
    res.send();
    Log.info("Updated settings");
  } catch ( err ) {
    console.error( err );
    res.status( 500 ).send( err.message );
    Log.error(`Failed updating settings: ${ err }`);
  }
});

function launchServer() {

  function startServer() {
    app.listen(3000, function() {
      Log.info('Prometheus Thinger Exporter Plugin is now running with the following configuration:');
      Log.info("HOST=" + HOST);
      Log.info("HTTT_PORT=" + HTTP_PORT);
      Log.info("HTTP_SSL_PORT=" + HTTP_SSL_PORT);
      Log.info("TOKEN=" + TOKEN);
      Log.info("USER=" + USER);
      Log.info("PLUGIN=" + PLUGIN);
      Log.info("VERSION=" + VERSION);

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
