/*global angular*/
angular.module('rn-device', ['ionic']).config(['$stateProvider', function ($stateProvider) {
    'use strict';

    $stateProvider.state('app.tab.device', {
        url: "/device/search",
        views: {
            'tab-device': {
                templateUrl: "app/device/search/search.html",
                controller: 'rn-device.search as vm'
            }
        }
    });
}]);