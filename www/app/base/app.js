/*global angular, cordova, StatusBar*/
angular.module('rn-poc', ['ionic', 'rn-visual', 'rn-device']).run(['$ionicPlatform', function ($ionicPlatform) {
    'use strict';

    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });

}]).config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider', function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    'use strict';

    $ionicConfigProvider.views.maxCache(0);
    $ionicConfigProvider.views.swipeBackEnabled(false);

//    $stateProvider.state('app', {
//        url: "",
//        abstract: true,
//        templateUrl: "app/base/menu/menu.html",
//        controller: 'rn-poc.menu as vm'
//    }).state('app.home', {
//        url: "/home",
//        views: {
//            'menuContent': {
//                templateUrl: "app/base/home/home.html"
//            }
//        }
//    });

    $urlRouterProvider.otherwise('/device/search');
}]);