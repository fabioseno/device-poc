/*global angular*/
angular.module('rn-poc').constant('appConfig', {
    product: {
        getFull: {
            url: 'https://item-search.herokuapp.com/full/:sku',
            method: 'GET',
            access_type: 'ONLINE_WITH_CACHE'
        },
        get: {
            url: 'https://item-search.herokuapp.com/:sku',
            method: 'GET',
            access_type: 'ONLINE_WITH_CACHE'
        }
    }
});