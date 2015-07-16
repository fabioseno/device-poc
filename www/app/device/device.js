/*global angular*/
angular.module('rn-device', ['ionic']).config(['$stateProvider', function ($stateProvider) {
    'use strict';

    $stateProvider.state('device', {
        url: "/device/search",
        templateUrl: "app/device/search/search.html",
        controller: 'rn-device.search as vm'
    });
}]);