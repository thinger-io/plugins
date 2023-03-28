const client = require('prom-client');

// Create a Registry to register the metrics
const prefix = 'thinger_';

// First off we connect to mongodb
const { MongoClient } = require("mongodb");

const MONGO_USER = process.env.THINGER_MONGODB_USER;
const MONGO_PASS = encodeURIComponent(process.env.THINGER_MONGODB_PASSWORD);
const MONGO_DB = process.env.THINGER_MONGODB_DATABASE;
const uri = `mongodb://${MONGO_USER}:${MONGO_PASS}@mongodb:27017/${MONGO_DB}?maxPoolSize=20&w=majority`;

const mongodb = new MongoClient(uri);

const db = mongodb.db(MONGO_DB);

//db.on('close', () => { console.log('Lost connection to mongodb') });

//db.on('reconnect', () => { console.log('Reconnected to mongodb') });

// Configure vm2 for running queries
const { NodeVM } = require('vm2');
const vm_mongo = new NodeVM({
  console: 'inherit',
  sandbox: {},
  timeout: 1000,
  require: {
    external: true
  },
  env: {
    db: db
  },
  strict: false // TODO: should be true
});

// TODO: Missing influx environment variables and connection to its container
/*
const vm_influx = new NodeVM({
  console: 'inherit',
  sandbox: {},
  timeout: 1000,
  require: {
    external: true
  },
  env: {
    db: queryApi
  },
  strict: false // should be true
});
*/

const api = require('./api');
const vm_thinger = new NodeVM({
  console: 'inherit',
  sandbox: {},
  timeout: 1000,
  require: {
    external: true
  },
  env: {
    api: api
  },
  strict: false // TODO: should be true
});

module.exports.createRegistry = function() {
  const Registry = client.Registry;
  return new Registry();
};

module.exports.clearRegistry = function (register) {
  register.clear();
};

module.exports.generateMetric = function ( register, metric ) {
  try {
    new (metricTypes.get(`${ metric.type }`))({
      name: metric.name,
      help: metric.help,
      labelNames: metric.labelNames,
      registers: [register],
      async collect() {
        let run = undefined;
        if ( metric.backend === 'thinger' ) {
          run = vm_mongo.run(`module.exports = async function( metric ) { const db = process.env.db; ${ (metric.script) } }`);
        } else if ( metric.backend === 'api' ) {
          run = vm_thinger.run(`module.exports = async function( metric ) { const api = process.env.api; ${ (metric.script) } }`);
        }
        if ( typeof run !== "undefined" )
          await run( this );
      }
    });
  } catch ( err ) {
    throw err;
  }

};

module.exports.testMetric = function ( metric ) {

  // Create registry for testing
  const Registry = client.Registry;
  const register = new Registry();

  try {
    new (metricTypes.get(`${ metric.type }`))({
      name: metric.name,
      help: metric.help,
      labelNames: metric.labelNames,
      registers: [register],
      async collect() {
        let run = undefined;
        if ( metric.backend === 'thinger' ) {
          run = vm_mongo.run(`module.exports = async function( metric ) { const db = process.env.db; ${ (metric.script) } }`);
        } else if ( metric.backend === 'api' ) {
          run = vm_thinger.run(`module.exports = async function( metric ) { const api = process.env.api; ${ (metric.script) } }`);
        }
        if ( typeof run !== "undefined" )
          await run( this );
      }
    });
  } catch ( err ) {
    throw err;
  }

  return register;

};

// Utils
const metricTypes = new Map([
    ['counter', client.Counter],
    ['gauge', client.Gauge],
    ['summary', client.Summary],
    ['histogram', client.Histogram]
]);

