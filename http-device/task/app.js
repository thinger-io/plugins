// initialize from environment variables
const HOST = process.env.THINGER_HOST;
const HTTP_PORT = process.env.THINGER_HTTP_PORT || 80;
const HTTP_SSL_PORT = process.env.THINGER_HTTP_SSL_PORT || 443;
const USER = process.env.THINGER_USER;
const PLUGIN = process.env.THINGER_PLUGIN;
const VERSION = process.env.THINGER_PLUGIN_VERSION;
const TOKEN = process.env.THINGER_TOKEN_HTTP_DEVICE_PLUGIN;
const DEVELOPMENT = process.env.THINGER_PLUGIN_DEVELOPMENT==='1';

// import dependencies
const express = require('express');
require('log-timestamp');

// configure express
const app = express();
app.use(express.json({strict: false, limit: '8mb'}));
app.use(express.text({limit: '8mb'}));
app.use(express.urlencoded({limit: '8mb'}));
app.use(express.raw({limit: '8mb'}));

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

    let tunnel = localtunnel(3000, {'subdomain': 'http-device'}, function(err, tunnel) {
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
    return settings.bucket_id_prefix ? settings.bucket_id_prefix + deviceId : deviceId;
}

function getDeviceTimeout(settings){
    return settings.device_connection_timeout ? settings.device_connection_timeout : 10;
}

function getDefaultResponse(settings){
    return settings.device_response_data ? JSON.parse(settings.device_response_data) : {};
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

async function handleDeviceRequest(req) {
    return new Promise(function (resolve, reject) {
        // get payload
        let payload = req.body;

        // get request ip
        let sourceIP = req.ip;

        // get timestamp
        let timestamp = req.query.ts || 0;

        // get application id
        let deviceType = getDeviceType(req.params.deviceType);

        // get device Id
        let deviceId = req.params.deviceId;

        // get settings associated to device type
        let settings = getSettings(deviceType);

        // device type not defined
        if(!settings) return reject({response: {status:400, data: {message: "device type '" + deviceType + "' has not been defined"}}});

        // set device id based on prefix
        let realDeviceId = getDeviceId(deviceId, settings);

        // get processed payload
        let processedPayload = runCallback(payload, 'request', deviceType, req.headers);

        console.log(`handling request with ts: ${timestamp}, deviceID: ${deviceId}, deviceType: ${deviceType}, payload: ${JSON.stringify(processedPayload)}`);

        // call device callback with payload fields
        thinger.callDeviceCallback(realDeviceId, processedPayload, sourceIP, timestamp)
            .then((response) => {
                response.data = runCallback(response.data, 'response', deviceType, response.headers);
                resolve(response);
            })
            .catch(function (error) {
                // device is not yet created?
                if (payload!==undefined && (error.response && error.response.status===404)) {

                    // no auto provision
                    if (!settings.auto_provision_resources) return reject(error);

                    // create device, bucket, and set callback
                    let realBucketId = getBucketId(deviceId, settings);
                    thinger.createHTTPDevice(realDeviceId, realDeviceId, 'Auto provisioned HTTP Device', settings)
                        .then(() => thinger.createBucket(realBucketId, realDeviceId, 'Auto provisioned HTTP Bucket', settings, {source: 'api'}))
                        .then(() => settings.device_response_data ? thinger.setDeviceProperty(realDeviceId, 'device_response', getDefaultResponse(settings)) : Promise.resolve())
                        .then(() => thinger.setDeviceCallback(realDeviceId, {write_bucket: realBucketId, send_property: 'device_response'}, {timeout: getDeviceTimeout(settings)}))
                        .then(() => thinger.callDeviceCallback(realDeviceId, processedPayload, sourceIP, timestamp))
                        .then((response) => {
                            response.data = runCallback(response.data, 'response', deviceType, response.headers);
                            resolve(response);
                        })
                        .catch((error) => { reject(error) });
                } else {
                    reject(error);
                }
            });
    });
}

app.post('/types/:deviceType([0-9a-zA-Z_]+)/devices/:deviceId([0-9a-zA-Z_]+)/data', function (req, res) {
    handleDeviceRequest(req)
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
});


app.post('/run_callback', function (req, res) {
    // get callback type
    let fn =  req.query.fn ? req.query.fn : 'request';
    
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
            console.log('HTTP Device Plugin is now running with the following configuration:');
            console.log("HOST=" + HOST);
            console.log("HTTT_PORT=" + HTTP_PORT);
            console.log("HTTP_SSL_PORT=" + HTTP_SSL_PORT);
            console.log("TOKEN=" + TOKEN);
            console.log("USER=" + USER);
            console.log("PLUGIN=" + PLUGIN);
            console.log("VERSION=" + VERSION);
            console.log("DEVELOPMENT=" + DEVELOPMENT);
        });
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
                device_response_data : '""'
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
