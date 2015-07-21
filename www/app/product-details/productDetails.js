/*global angular*/
angular.module('rn-product-details', ['ionic', 'rn-retail']).config(['$stateProvider', function ($stateProvider) {
    'use strict';

    $stateProvider.state('app.tab.productdetails', {
        url: "/productdetails/search",
        views: {
            'tab-products': {
                templateUrl: 'app/product-details/search/search.html',
                controller: 'rn-productDetails.search as vm'
            }
        }
    }).state('app.tab.productImage', {
        url: "/productdetails/image?productCode&colorId",
        views: {
            'tab-products': {
                templateUrl: 'app/product-details/search/zoom.html',
                controller: 'rn-productDetails.productZoom as vm'
            }
        }
    });
}]);