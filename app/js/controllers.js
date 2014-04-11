'use strict';

/* Controllers */

var alertaControllers = angular.module('alertaControllers', []);

alertaControllers.controller('AlertListController', ['$scope', 'Environment', 'Service', 'Alert',
  function($scope, Environment, Service, Alert){

    $scope.q = {};

    Environment.all(function(response) {
      $scope.environments = response.environments;
    });

    Service.all(function(response) {
      $scope.services = response.services;
    });

    $scope.getAlerts = function() {

      $scope.q['environment'] = $scope.environment;
      $scope.q['service'] = $scope.service;

      console.log('q=' + $scope.q)
      console.log('env=' + $scope.environment + ' svc=' + $scope.service);

      Alert.query($scope.q, function(response) {
        $scope.alerts = response.alerts;
      });
    };

    $scope.alertLimit = 10;
    $scope.getAlerts();
  }]);

alertaControllers.controller('AlertDetailController', ['$scope', '$routeParams', 'Alert',
  function($scope, $routeParams, Alert){
    Alert.get({id: $routeParams.id}, function(response) {
      $scope.alert = response.alert;
    });

  }]);

alertaControllers.controller('AlertLinkController', ['$scope', '$location',
  function($scope, $location) {

    $scope.getDetails = function(alert) {
      $location.url('/alert/' + alert.id);
    };
  }]);
