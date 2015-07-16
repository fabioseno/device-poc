/*global angular*/
angular.module('rn-visual').service('toaster', ['$ionicLoading', function ($ionicLoading) {
    'use strict';

    this.show = function (message, options) {

        if (!message) {
            message = '';
        }
        if (!options) {
            options = {
                template: message,
                duration: 1000,
                showDelay: 10
            };
        }

        $ionicLoading.show(options);
    };

    this.hide = function () {
        $ionicLoading.hide();
    };
}]);