
app.controller('RemovePropertyModalController', ['$scope', '$uibModalInstance', 'items', function($scope, $uibModalInstance, items) {
    $scope.items = items;

    $scope.ok = function () {
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    };
}]);

app.filter('capitalize', function() {
    return function(token) {
        return token.charAt(0).toUpperCase() + token.slice(1);
    }
});

app.controller('AddInnerResourcePropertyController', ['$scope', '$uibModalInstance', 'plugin', 'settings', 'elements', 'selectedConfiguration', 'currentValue', 'action', function($scope, $uibModalInstance, plugin, settings, elements, selectedConfiguration, currentValue, action) {

    $scope.plugin = plugin;
    $scope.settings = settings;
    $scope.selectedConfiguration = selectedConfiguration;
    $scope.error = false;
    $scope.error_message = "No error found";

    if ( typeof currentValue === "undefined" )
      $scope.modifiedValue = {};
    else
      $scope.modifiedValue = angular.copy( currentValue );

    $scope.fullScreen = function(){
        let element = document.getElementById('property-editor');

        if (!document.fullscreenElement) {
            if (element.requestFullscreen) {
                element.requestFullscreen().then(r => {});
            }
        }else if (document.exitFullscreen) {
            document.exitFullscreen().then(r => {});
        }
    }

    $scope.test_metric = function(data){
      $scope.callbackResponse = "";
      $scope.plugin.post('/metrics/test', data).then(function(result) {
        $scope.callbackResponse = result.data;
      },function error(error){
        console.log(error);
        $scope.callbackResponse = error.data;
        //showError(error);
      });
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    };

    $scope.close = function (){
        $uibModalInstance.close();
    };

    $scope.showError = function( str ) {
        $scope.error = true;
        console.error( str );
        $scope.error_message = str;

       setTimeout(function() {
          $scope.error = false;
        }, 5000);

    }

    $scope.save = function(){
        if ( action === "add" || action === "clone" ) {
          let index = elements.findIndex((obj => obj.name === $scope.modifiedValue.name));
          if ( index !== -1 ) {
            console.error("The metric name already exists"); // TODO: show error in modal
            showError("The metric name already exists"); // TODO: show error in modal
            return;
          } else { // new element
            $scope.settings.value[ $scope.selectedConfiguration ].metrics.push($scope.modifiedValue);
          }
        } else if ( action === "edit" ) { // edit element
          index = elements.findIndex((obj => obj.name === currentValue.name));
          elements[index] = $scope.modifiedValue;
        }

        // update plugin with modified content
        $scope.plugin.setProperty('settings', $scope.settings).then( async function() {

            await $scope.plugin.put('/settings', $scope.settings.value);
            $uibModalInstance.close();
            $scope.error = false;

        }, function ( error ) {
            console.error(error);
        });

    };


      $scope.backend = new Map([
        ['thinger', "Thinger.io Database"],
        ['buckets', "Data Buckets"],
        ['api', "API"]
      ]);

}]);

angular.module('innerResourceProperties', ['uiAce', 'angularJsonTree', 'profileSourceConfigurator', 'deviceResourceSelector'])
    .directive('innerResourceProperties', function(){
        return {
            restrict: 'EA',
            transclude: true,
            scope: {
                fieldId     : "@?",
                title       : "@?",
                hint        : "@?",
                icon        : "@?",
                selectedConfiguration : "=",
                plugin      : "=",
                settings    : "="
            },
            templateUrl: function(){
              let url = document.querySelector("script[src$='prometheus-exporter-settings.js']");
              return url.src.replace('prometheus-exporter-settings.js','directives/inner-resource-properties/inner-resource-properties.html');
            },
            controllerAs: 'vm',
            controller: ['$scope', '$stateParams', '$uibModal', function($scope, $stateParams, $uibModal){

                function sourcePath() {
                  const path = document.querySelector("script[src$='prometheus-exporter-settings.js']").src.replace(/\/[^\/]*$/, "");;
                  return path;
                }

                $scope.elements = [];
                $scope.selected_items = [];
                $scope.loading = false;

                let confChanged = $scope.$watch("selectedConfiguration", function( newValue, oldValue ) {
                  if ( newValue !== oldValue )
                    $scope.refresh();
                });

                let settingsChanged = $scope.$watch("settings", function( newValue, oldValue ) {
                    $scope.refresh();
                });

                $scope.$on('$destroy', function () {
                  confChanged();
                  settingsChanged();
                });

                $scope.refresh = function(){
                  if ( typeof $scope.settings !== "undefined"
                    && typeof $scope.settings.value[$scope.selectedConfiguration] !== "undefined"
                    && $scope.settings.value[$scope.selectedConfiguration].hasOwnProperty('metrics') )
                  {
                    $scope.elements = $scope.settings.value[$scope.selectedConfiguration].metrics;
                  } else {
                    $scope.elements = [];
                  }

                };

                $scope.cloneElement = function (item){
                    let index = $scope.elements.findIndex((obj => obj.name === item));
                    if( index !== -1 ) {
                        let clone = angular.copy($scope.elements[index]);
                        $scope.add_element('clone', clone);
                    }
                }

                $scope.add_element = function(action, value){
                    let url;
                    switch($scope.fieldId){
                        case 'metrics':
                            url = sourcePath() + '/directives/inner-resource-properties/inner-resource-metric-modal.html';
                            break;
                        default:
                            url = sourcePath() + '/directives/inner-resource-properties/inner-resource-editor-modal.html';
                            break;
                    }
                    let modalInstance = $uibModal.open({
                        templateUrl: url,
                        controller: 'AddInnerResourcePropertyController',
                        size: 500,
                        backdrop  : 'static',
                        keyboard  : true,
                        resolve: {
                            plugin: function() {
                                return angular.copy($scope.plugin);
                            },
                            settings: function(){
                                return $scope.settings;
                            },
                            elements: function () {
                                return $scope.elements;
                            },
                            fieldId: function (){
                                return $scope.fieldId;
                            },
                            selectedConfiguration: function() {
                                return $scope.selectedConfiguration;
                            },
                            currentValue: function() {
                                return value;
                            },
                            action: function() {
                                return action;
                            }
                        }
                    });

                    modalInstance.result.then(function (elements) {
                        if(typeof elements !== 'undefined'){
                            $scope.elements = elements
                        }
                    }, function () {

                    });
                };

                $scope.open_remove_dialog = function (size) {
                    let modalInstance = $uibModal.open({
                        templateUrl: 'modal.html',
                        controller: 'RemovePropertyModalController',
                        size: size,
                        resolve: {
                            items: function () {
                                let properties = [];
                                for(let j=0; j<$scope.selected_items.length; j++){
                                    properties.push($scope.selected_items[j]);
                                }
                                return properties;
                            }
                        }
                    });

                    modalInstance.result.then(function () {

                        // remove item from elements
                        for ( let i=0; i < $scope.selected_items.length; i++ ) {
                            let index = $scope.elements.findIndex((obj => obj.name === $scope.selected_items[i] ));
                            $scope.elements.splice(index,1);
                        }

                        // update plugin with modified content
                        $scope.plugin.setProperty('settings', $scope.settings).then(function() {
                        }, function ( error ) {
                          console.error(error);
                        });
                    }, function () {

                    });
                };

                $scope.refresh();
      $scope.backend = new Map([
        ['thinger', "Thinger.io Database"],
        ['buckets', "Data Buckets"],
        ['api', "API"]
      ]);

            }]
        }
    });
