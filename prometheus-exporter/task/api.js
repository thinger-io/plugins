'use strict';

const Log = require('./lib/utils/log.js');

let USER = "";
let PLUGIN = "";

let headers;
let baseUrl

module.exports.configure = function(HOST, HTTP_PORT, TOKEN, THINGER_USER, THINGER_PLUGIN){
    baseUrl = `http://${HOST}:${HTTP_PORT}`;

    headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ TOKEN }`
    };

    USER = THINGER_USER;
    PLUGIN = THINGER_PLUGIN;

    Log.info("configure api with", HOST, TOKEN, USER, PLUGIN);
};

module.exports.getPluginPropertyValue = async function(propertyId) {
  Log.info("Get Settings property");
  return fetch(`${ baseUrl }/v1/users/${ USER }/plugins/${ PLUGIN }/properties/${ propertyId }`, { headers: headers })
    .then((response) => {
      if ( response.status === 404 ) {
        return { 'Default': [] };
      } else if ( ! response.ok ) {
        throw new Error('Network response was not OK nor 404');
      } else {
        return response.json();
      }
    })
    .then((data) => {
      return data.value;
    })
    .catch(( err ) => {
      throw err;
    });
};

