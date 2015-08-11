/*global angular, cordova, StatusBar*/
angular.module('rn-poc', ['ionic', 'wt-core', 'rn-visual', 'rn-retail', 'rn-device', 'rn-product-details']).run(['$ionicPlatform', 'invoker', 'appConfig', function ($ionicPlatform, invoker, appConfig) {
    'use strict';

    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });

    $ionicPlatform.registerBackButtonAction(function(e) {
        //do your stuff
        e.preventDefault();
    }, 101);

    invoker.setConfiguration(appConfig);

}]).config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider', function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    'use strict';

    $ionicConfigProvider.views.swipeBackEnabled(false);

    $stateProvider.state('app', {
        url: "",
        abstract: true,
        templateUrl: "app/base/home/logged-container.html"
    }).state('app.tab', {
        url: '',
        abstract: true,
        templateUrl: 'app/base/home/tabs.html'
    });

    $urlRouterProvider.otherwise('/productdetails/search');
}]);