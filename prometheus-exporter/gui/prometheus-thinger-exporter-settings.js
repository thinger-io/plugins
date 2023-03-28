'use strict';
angular.module('PrometheusThingerExporterPlugin', ['uiAce'])
    .directive('prometheusThingerExporterSettings', function(){
    return {
        restrict: 'EA',
        scope: {
            plugin : '=',
        },
        templateUrl: function(){
            let url = document.querySelector("script[src$='prometheus-thinger-exporter-settings.js']");
            return url.src.replace('.js','.html');
        },
        controller: ['$scope', function($scope){

          $scope.sourcePath = function() {
            const path = document.querySelector("script[src$='prometheus-thinger-exporter-settings.js']").src.replace(/\/[^\/]*$/, "");;
            return path;
          }

          $scope.ui = {
            selectedConfiguration: "Default",
            configuration: ""
          };

          function initSettings( cfg ) {
            $scope.settings.value[cfg] = {}
            $scope.settings.value[cfg].metrics = [];
            $scope.settings.value[cfg].enabled = true;
          };

          $scope.plugin.getProperty('settings').then(function(settings) {
            $scope.settings = settings;
          },function error(){
            $scope.settings = {};
            $scope.settings.value = {};
            initSettings('Default');
          });

          $scope.plugin.getToken('prometheus_thinger_exporter_plugin_callback').then(function(token) {
            $scope.prometheus_thinger_exporter_plugin_callback = token.access_token;
          }, function ( err ) {
            console.log( err );
            $scope.prometheus_thinger_exporter_plugin_callback = 'Token not found!';
          });

          $scope.createConfiguration = function( cfg ) {

            $scope.callbackResponse = "";

            initSettings(cfg);

            $scope.plugin.setProperty('settings', $scope.settings).then( async function() {
              $scope.ui.selectedConfiguration = cfg;
              $scope.ui.configuration = "";
            }, function ( err ) {
              console.error( err );
            });

          };

          $scope.removeConfiguration = function( cfg ) {
            delete $scope.settings.value[cfg];
            $scope.ui.selectedConfiguration = 'Default';
          };

          $scope.testConfiguration = function(cfg){
            $scope.callback_result = "";
            $scope.plugin.get(`/${ cfg }/metrics`).then(function(result) {
              $scope.callbackResponse = result.data;
            },function error(error){
              showError(error);
            });
          };

          function showError(response){
            $scope.error_code = response.status;
            if(response.status<=0){
              $scope.error_message = "connection refused";
            } else if ( 'data' in response && 'error' in response.data ) {
              $scope.error_message = response.data.error.message;
            } else {
              $scope.error_message = 'unknown';
            }
          }

          $scope.setEnabled = function ( cfg ) {

            $scope.plugin.setProperty('settings', $scope.settings).then( function() {
            }, function ( err ) {
              console.error( err );
            });
          }

        }]
    }
});
