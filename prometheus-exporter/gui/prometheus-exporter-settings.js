'use strict';
angular.module('PrometheusExporterPlugin', ['uiAce'])
    .directive('prometheusExporterSettings', function(){
    return {
        restrict: 'EA',
        scope: {
            plugin : '=',
        },
        templateUrl: function(){
            let url = document.querySelector("script[src$='prometheus-exporter-settings.js']");
            return url.src.replace('.js','.html');
        },
        controller: ['$scope', function($scope){

          $scope.sourcePath = function() {
            return document.querySelector("script[src$='prometheus-exporter-settings.js']").src.replace(/\/[^\/]*$/, "");
          }

          $scope.ui = {
            selectedConfiguration: "Default",
            configuration: ""
          };

          $scope.save = function() {
            console.log($scope.settings);
            $scope.plugin.setProperty('settings', $scope.settings).then( async function() {
              await $scope.plugin.put('/settings', $scope.settings.value);
            }, function ( err ) {
              console.error( err );
            });
          }

          function initSettings( cfg ) {
            $scope.settings.value[cfg] = {}
            $scope.settings.value[cfg].metrics = [];
            $scope.settings.value[cfg].enabled = true;
            $scope.settings.value[cfg].async = true;
            $scope.settings.value[cfg].cache_interval = { magnitude: 'second' };
          }

          $scope.plugin.getProperty('settings').then(function(settings) {
            $scope.settings = settings;

            // Initialize values for new settings
            for (let cfg in $scope.settings.value) {
              if ( typeof $scope.settings.value[cfg].cache_interval === "undefined" ) {
                $scope.settings.value[cfg].cache_interval = { magnitude: 'second' };
              }
              if ( typeof $scope.settings.value[cfg].async === "undefined" ) {
                $scope.settings.value[cfg].async = true;
              }
            }

          },function error(){
            $scope.settings = {};
            $scope.settings.value = {};
            initSettings('Default');
          });

          $scope.plugin.getToken('prometheus_exporter_plugin_callback').then(function(token) {
            $scope.prometheus_exporter_plugin_callback = token.access_token;
          }, function ( err ) {
            console.log( err );
            $scope.prometheus_exporter_plugin_callback = 'Token not found!';
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

        }]
    }
});
