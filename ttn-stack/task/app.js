// initialize from environment variables
const HOST = process.env.THINGER_HOST;
const HTTP_PORT = process.env.THINGER_HTTP_PORT || 80;
const HTTP_SSL_PORT = process.env.THINGER_HTTP_SSL_PORT || 443;
const USER = process.env.THINGER_USER;
const PLUGIN = process.env.THINGER_PLUGIN;
const VERSION = process.env.THINGER_PLUGIN_VERSION;
const TOKEN = process.env.THINGER_TOKEN_TTN_STACK_PLUGIN;
const DEVELOPMENT = process.env.THINGER_PLUGIN_DEVELOPMENT==='1';

// import dependencies
const WebSocket = require('ws');
const express = require('express');
require('log-timestamp');

// configure express
const app = express();
app.use(express.json({strict: false, limit: '8mb'}));
app.enable('trust proxy');

// initialize development options
if(DEVELOPMENT){

    // allow CORS
    const cors = require('cors');
    app.use(cors({origin: '*'}));

    // add access control headers
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    // serve static files from plugin root
    app.use(express.static('../'));

    // create a local tunnel for serving plugin files without installing on a server
    let localtunnel = require('localtunnel');

    let tunnel = localtunnel(3000, {'subdomain': 'ttn-plugin'}, function(err, tunnel) {
        if(!err){
            console.log("local tunnel running at: %s", tunnel.url);
        }else{
            console.error(err);
        }
    });

    tunnel.on('close', function() {
        console.error("tunnel closed, restart app!");
    });
}

// get and configure thinger.io api
const thinger = require('./api/api.js');
thinger.configure(HOST, HTTP_PORT, TOKEN, USER, PLUGIN);

// configure vm2 for running payload processing
const {NodeVM, VMScript} = require('vm2');
const { json } = require('express');
const vm = new NodeVM({
    console: 'inherit',
    sandbox: {},
    timeout: 1000,
    require: {
        external: true
    }
});

// running variables
let settings = {};

function getDeviceType(deviceType){
    return (deviceType && deviceType!=='') ? deviceType : 'Default';
}

function getSettings(deviceType){
    if(deviceType && deviceType!==''){
        if(settings.hasOwnProperty(deviceType)){
            return settings[deviceType];
        }else{
            console.error('requested device type is not available');
        }
    }else{
        return settings['Default'];
    }
    return undefined;
}

function getDeviceId(deviceId, settings){
    return settings.device_id_prefix ? settings.device_id_prefix + deviceId : deviceId;
}

function getBucketId(deviceId, settings){
  if ( settings.auto_provision_bucket )
    return settings.bucket_id_prefix ? settings.bucket_id_prefix + deviceId : deviceId;
  return settings.assign_bucket;
}

function getDeviceTimeout(settings){
    return settings.device_connection_timeout ? settings.device_connection_timeout : 10;
}

function getDefaultDownlink(settings){
    return settings.device_downlink_data ? JSON.parse(settings.device_downlink_data) : {};
}

function compileCallback(deviceType){
    console.log("compiling callback for device type:", deviceType);

    let settings = getSettings(deviceType);

    // precompile custom callback script
    if(settings && settings.callback_processing && settings.callback_code!=='') {
        try{
            settings.script = vm.run(settings.callback_code);
            console.log("compiled callbacks :", Object.keys(settings.script));
        }catch (err) {
            console.error('callback disabled. failed to compile script:', err.message);
            settings.script = undefined;
            return err;
        }
    }else{
        console.log('device type without callbacks:', deviceType);
        settings.script = undefined;
    }
    return true;
}

function compileCallbacks(stopOnError) {
    for (let deviceType in settings) {
        let result = compileCallback(deviceType);
        if(result!==true && stopOnError===true){
            return {'message' : 'invalid callback code on device type: ' + deviceType + " > " + result.message};
        }
    }
    return true;
}

function runCallback(data, callback, deviceType, extra){
    let settings = getSettings(deviceType);
    if(!settings || data===undefined || settings.script===undefined || settings.script[callback]===undefined) return data;
    try {
        console.log('running callback: ' + callback + ' for: ' + deviceType);
        let result =  settings.script[callback](data, extra);
        console.log('converted data:', JSON.stringify(result));
        return result;
    } catch (err) {
        console.error('failed to execute ' + callback + ' script.', err);
        return data;
    }
}

function handelDeviceUplinkRequest(req, res) {
    handleDeviceUplink(req)
        .then(response => {
            if(response.data){
                res.status(response.status).send(response.data);
            }else{
                res.sendStatus(response.status);
            }
        })
        .catch(error => {
            console.error(error);
            if(error.response && error.response.status){
                res.status(error.response.status).send(error.response.data);
            }else{
                res.status(500).send(error);
            }
        });
}

async function updateDeviceProperties(req, deviceId, payload, settings){
    let properties = [];

    // device data (used for keeping downlink callbacks, physical ids, ports, etc)
    properties.push({property: 'device', value: {
        application_id :        payload.end_device_ids.application_ids.application_id,
        device_id :             payload.end_device_ids.device_id,
        dev_eui:                payload.end_device_ids.dev_eui,
        f_port:                 payload.uplink_message.f_port,
        f_cnt:                  payload.uplink_message.f_cnt,
        downlink: {
            api_key:            req.header('X-Downlink-Apikey'),
            push_url:           req.header('X-Downlink-Push'),
            replace_url:        req.header('X-Downlink-Replace'),
            confirmed:          !!settings.downlink_confirmed,
            priority:           settings.downlink_priority || 'LOWEST'
        }
    }});

    // device location
    if (settings.update_device_location) {
        try{
            if(payload.uplink_message.locations){
                properties.push({
                    property: 'location', value: {
                        latitude: payload.uplink_message.locations.user.latitude,
                        longitude: payload.uplink_message.locations.user.longitude,
                        altitude: payload.uplink_message.locations.user.altitude,
                    }
                });
            }
        }catch(error){
            console.error("cannot get location:", error);
        }
    }

    // set device properties (if any)
    if (properties.length > 0) {
        return thinger.setDeviceProperties(deviceId, properties)
                .then((response) => {})
                .catch((error) => {
                    console.error("cannot set device properties:", error);
                });
    }

    return Promise.resolve();
}

async function getDeviceDownlinkData(deviceId, submitData){
    return new Promise(function (resolve, reject) {
        if(Object.keys(submitData).length === 0 && submitData.constructor === Object){
            console.log("getting device downlink data");
            // return the downlink data in the device property
            thinger.getDeviceProperty(deviceId, 'device_downlink').then((response) => {
                let data = response.data.value;
                console.log('got device downlink data:', JSON.stringify(data));
                resolve(data);
            }).catch((error) => {
                console.error(error);
                reject(error);
            });
        }
        else{
            console.log('using device downlink data:', submitData);
            // return the payload found in the query
            resolve(submitData);
        }
    });
}

function getTTNDownlinkData(deviceProperty, payload, settings){

    let data = runCallback(payload, 'downlink', deviceProperty.application_id, deviceProperty);

    let frm_payload = data;
    let f_port = deviceProperty.f_port;

    if ( typeof data === 'object' ) {
        if ( data.hasOwnProperty('f_port') ) f_port = data.f_port;
        if ( data.hasOwnProperty( 'payload')) frm_payload = data.payload;
    }

    let downlink = {
        downlinks : [
            {
                f_port: f_port,
                frm_payload: frm_payload,
                priority: settings.downlink_priority || 'LOWEST',
                confirmed: !!settings.downlink_confirmed,
            }    
        ]
    };

    return downlink;
}

async function handleDeviceUplink(req) {
    return new Promise(function (resolve, reject) {

        // get payload
        let payload = req.body;

        // get requeset ip
        let sourceIP = req.ip;

        // get timestamp
        let timestamp = 0;
        try{
            let ts = new Date(payload.uplink_message.rx_metadata[0].time);   
            timestamp = ts.getTime() || 0;
        }catch(error){
            console.error("cannot get uplink message timestamp:", error);
        };

        // get application id
        let deviceType = getDeviceType(payload.end_device_ids.application_ids.application_id);

        // get device Id
        let deviceId = payload.end_device_ids.dev_eui;

        // get settings associated to device type
        let settings = getSettings(deviceType);

        // device type not defined
        if(!settings) return reject({response: {status:400, data: {message: "device type '" + deviceType + "' has not been defined"}}});

        // set device id based on prefix
        let realDeviceId = getDeviceId(deviceId, settings);

        // get ttn device id (identifier manually established on TTN)
        let ttnDeviceId = payload.end_device_ids.device_id;

        // get processed uplink payload
        let data = payload.uplink_message.decoded_payload ? payload.uplink_message.decoded_payload : payload.uplink_message.frm_payload;
        let processedPayload = runCallback(data, 'uplink', deviceType, payload);

        console.log(`handling uplink with ts: ${timestamp}, device eui: ${deviceId}, application: ${deviceType}, payload: ${JSON.stringify(processedPayload)}`);

        // call device callback with payload fields
        thinger.callDeviceCallback(realDeviceId, processedPayload, sourceIP, timestamp)
            .then((response) => {
                updateDeviceProperties(req, realDeviceId, payload, settings)
                    .then(() => { resolve(response); })
                    .catch((error) => { reject(error); } )
            })
            .catch(async function (error) {
                // device is not yet created?
                if (payload!==undefined && (error.response && error.response.status===404)) {

                    // no auto provision
                    if (!settings.auto_provision_resources) return reject(error);

                    let realBucketId = getBucketId(deviceId, settings);

                    // auto provision bucket
                    if ( settings.auto_provision_bucket ) {
                      await thinger.createBucket(realBucketId, ttnDeviceId, 'Auto provisioned TTN Bucket', settings, {source: 'api'}).catch((error) => { reject(error) });
                    }


                    // create device, bucket, and set callback
                    thinger.createHTTPDevice(realDeviceId, ttnDeviceId, 'Auto provisioned TTN Device', settings)
                        .then(() => thinger.setDeviceProperty(realDeviceId, 'device_downlink', getDefaultDownlink(settings)))
                        .then(() => {
                          let actions = {};
                          if ( typeof realBucketId !== 'undefined' ) actions["write_bucket"] = realBucketId;
                          thinger.setDeviceCallback(realDeviceId, actions, {timeout: getDeviceTimeout(settings)})
                        })
                        .then(() => settings.assign_project ? thinger.setDeviceProject(realDeviceId, settings.assign_project) : Promise.resolve())
                        .then(() => settings.assign_project && settings.auto_provision_bucket ? thinger.setBucketProject(realBucketId, settings.assign_project) : Promise.resolve())
                        .then(() => updateDeviceProperties(req, realDeviceId, payload, settings))
                        .then(() => thinger.callDeviceCallback(realDeviceId, processedPayload, sourceIP, timestamp))
                        .then((response) => { resolve(response); })
                        .catch((error) => { reject(error) });
                } else {
                    reject(error);
                }
            });
    });
}

async function handleDeviceDownlink(deviceId, payload) {
    return new Promise(function (resolve, reject) {

        // get 'device' property from device with information about port, eui, downlink urls, ...
        thinger.getDeviceProperty(deviceId, 'device')
            .then((response) => {
                let device = response.data.value;
                console.log('got device property:', device);

                // get settings associated to device type
                let deviceType = device.application_id;
                let settings = getSettings(deviceType);

                // get downlink payload
                let downlinkPayload = getTTNDownlinkData(device, payload, settings);

                // get downlink url
                let downlinkUrl = settings.downlink_push ? device.downlink.push_url : device.downlink.replace_url;

                console.log(`sending request to ttn: ${downlinkUrl}: ${JSON.stringify(downlinkPayload)}`);
                const axios = require('axios');
                axios({
                    method: 'post',
                    url: downlinkUrl,
                    headers: {'Authorization': `Bearer ${device.downlink.api_key}`},
                    data: downlinkPayload
                }).then((result) => {
                    console.log('downlink call succeed!');
                    resolve(result);
                }).catch((error) => {
                    console.error('downlink call error!', error);
                    reject(error);
                })
            })
            .catch((error) => {
                console.error('cannot read ttn device property');
                reject({status: 500, data: {error: {message: 'cannot get ttn device property'}}});
            });
    });
}

app.post('/uplink', function (req, res) {
    console.log("handling uplink callback:", req.originalUrl);
    handelDeviceUplinkRequest(req, res);
});

 app.post('/downlink/:deviceId([0-9a-zA-Z_]+)', function (req, res) {
    console.log("handling downlink callback: " + req.originalUrl);
    handleDeviceDownlink(req.params.deviceId, req.body).then(result => {
        return res.status(result.status).send(result.data);
    }).catch(error => {
        return res.status(error.status).send(error.data);
    });
});

app.post('/run_callback', function (req, res) {
    // get callback type
    let fn =  req.query.fn ? req.query.fn : 'uplink';
    
    // get device type
    let deviceType = getDeviceType(req.query.deviceType);

    console.log(`testing '${fn}' for '${deviceType}' application`);

    try {
        let settings = getSettings(deviceType);
        if(settings && settings.script && settings.script[fn]){
            res.json(settings.script[fn](req.body));
        }else{
            res.status(500).send({error: {message: 'script or function for ' + fn + ' not defined'}});
        }

    } catch (err) {
        console.error('failed to execute script.', err);
        res.status(500).send({error: {message: err.message}});
    }
});

app.put('/settings', function (req, res) {
    console.log("updating settings: ");
    console.log(JSON.stringify(settings));
    settings = req.body;
    let result = compileCallbacks(true);
    return result===true ? res.sendStatus(200) : res.status(400).send({error:{message: result.message}});
});

function launchServer() {

    function startServer() {

      app.listen(3000, function () {
        console.log('TTN Stack Plugin is now running with the following configuration:');
        console.log("HOST=" + HOST);
        console.log("HTTT_PORT=" + HTTP_PORT);
        console.log("HTTP_SSL_PORT=" + HTTP_SSL_PORT);
        console.log("TOKEN=" + TOKEN);
        console.log("USER=" + USER);
        console.log("PLUGIN=" + PLUGIN);
        console.log("VERSION=" + VERSION);
        console.log("DEVELOPMENT=" + DEVELOPMENT);
      });

      let connectWs = function(){

        console.log("connecting websocket for events...");
        let url = `ws://${HOST}:${HTTP_PORT}/v1/users/${USER}/events?authorization=${TOKEN}`;

        const ws = new WebSocket(url, {
            perMessageDeflate: false
        });

        ws.on('open', function open() {
            console.log("subscribing for ttn downlink events...");
            // subscribe to events 
            ws.send(JSON.stringify({
                event: 'device_property_update',
                property: 'device_downlink'
            }));
        });

        ws.on('message', function incoming(data) {
            console.log("got ttn downlink property update:", data);
            let downlink = JSON.parse(data);
            handleDeviceDownlink(downlink.device, downlink.value).then(result => {

            }).catch(error => {

            });
        });

        ws.on('error', function(error) {
            console.log("websocket error:", error);
        });

        ws.on('close', function() {
            console.log('websocket closed... reconnecting...');
            setTimeout(connectWs, 5*1000);
        });
      }

      connectWs();

    };

    thinger.getPluginProperty('settings').then(function (response) {

        settings = response.data.value;
        console.log("read existing settings:",JSON.stringify(settings));
        compileCallbacks();

        startServer();

    }).catch(function (error) {

        if ( error.response && error.response.status === 404 ) {

            console.error("plugin settings not found");
            settings = {
              'Default' : {
                auto_provision_resources : false,
                auto_provision_bucket: true,
                device_downlink_data : '""'
              }
            };

            startServer();
        } else {
            // Active wait until server is ready
            console.error('server not available, checking again in 15 seconds...');
            setTimeout( launchServer, 15000 );
        }

    });

}

launchServer();

