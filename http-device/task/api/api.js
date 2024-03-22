// configure axios
const axios = require('axios');
let USER = "";
let PLUGIN = "";

module.exports.configure = function(HOST, HTTP_PORT, TOKEN, THINGER_USER, THINGER_PLUGIN){
    axios.defaults.baseURL = `http://${HOST}:${HTTP_PORT}`;
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + TOKEN;
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    USER = THINGER_USER;
    PLUGIN = THINGER_PLUGIN;
    console.log("configure api with", HOST, TOKEN, USER, PLUGIN);
};

module.exports.createHTTPDevice = async function(deviceId, deviceName, deviceDescription, settings) {
    let data = {
        device: deviceId,
        name: deviceName,
        type: 'HTTP',
        description: deviceDescription
    };
    if(settings.assign_asset_type) data.asset_type = settings.assign_asset_type;
    if(settings.assign_asset_group) data.asset_group = settings.assign_asset_group;
    if(settings.assign_product) data.product = settings.assign_product;
    console.log(`creating device: ${JSON.stringify(data)}`);
    return axios({
        method: 'post',
        url: `/v1/users/${USER}/devices`,
        data: data
    });
};

module.exports.createBucket = async function(bucketId, bucketName, bucketDescription, settings, config){
    if(config===undefined) config = {source: 'api'};
    let data = {
        bucket: bucketId,
        name: bucketName,
        description: bucketDescription,
        enabled: true,
        config: config
    }
    if(settings.assign_asset_type) data.asset_type = settings.assign_asset_type;
    if(settings.assign_asset_group) data.asset_group = settings.assign_asset_group;
    if(settings.assign_product) data.product = settings.assign_product;
    console.log(`creating bucket: ${JSON.stringify(data)}`);
    return axios({
        method: 'post',
        url: `/v1/users/${USER}/buckets`,
        data: data
    });
};

module.exports.setDeviceProperties = async function(device_id, properties){
    return axios({
        method: 'post',
        url:  `/v3/users/${USER}/devices/${device_id}/properties`,
        data: properties
    });
};

module.exports.setDeviceProperty = async function(deviceId, property, value){
    console.log(`setting device property '${property}' with value: ${JSON.stringify(value)}`);
    let prop = {
        property: property,
        value: value
    };
    return module.exports.setDeviceProperties(deviceId, prop);
};


module.exports.setDeviceCallback = async function (deviceId, actions, properties) {
    console.log(`setting device callback: ${deviceId}`);
    return axios({
        method: 'put',
        url: `/v3/users/${USER}/devices/${deviceId}/callback`,
        data: {
            actions: actions,
            properties: properties
        }
    });
};

module.exports.callDeviceCallback = async function(deviceId, payload, sourceIP, timestamp) {
    console.log(`calling device callback: ${deviceId}`);
    return axios({
        method: payload!==undefined ? 'post' : 'get',
        url: `/v3/users/${USER}/devices/${deviceId}/callback/data`,
        params: {
            ts: timestamp,
            ip: sourceIP
        },
        data: JSON.stringify(payload)
    });
};

module.exports.getPluginProperty = async function(propertyId){
    return axios({
        url: `/v1/users/${USER}/plugins/${PLUGIN}/properties/${propertyId}`,
    });
};

module.exports.getDeviceProperty = async function(deviceId, propertyId){
    return axios({
        url: `/v3/users/${USER}/devices/${deviceId}/properties/${propertyId}`,
    });
};

module.exports.setDeviceProject = async function(deviceID, project) {
    console.log(`setting project ${project} for ${deviceId}`);
    return axios({
      method: 'put',
      url: `/v1/users/${USER}/devices/${deviceID}/projects`,
      data: JSON.stringify([ project ])
    });
}

module.exports.setBucketProject = async function(bucketId, project) {
  console.log(`setting project ${project} for ${bucketId}`);
  return axios({
    method: 'put',
    url: `/v1/users/${USER}/buckets/${deviceID}/projects`,
    data: JSON.stringify([ project ])
  });
}
