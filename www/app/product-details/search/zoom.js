/*global angular, cordova*/
(function () {
    'use strict';

    function ProductZoom($location, $stateParams) {
        var vm = this;

        function loadData() {
            vm.pictureZoomUrl = 'http://largeimg.lojasrenner.com.br/images/variant/large/' + $stateParams.productCode + '-' + $stateParams.colorId + '_z_1.jpg';
            
            vm.pictureUrl = 'http://iconimg.lojasrenner.com.br/images/variant/icon/' + $stateParams.productCode + '-' + $stateParams.colorId + '_v_1.jpg';
        }

        vm.goBack = function () {
            //vm.pictureUrl = undefined;

            $location.url('/product-details/search');
        };

        loadData();
    }

    ProductZoom.$inject = ['$location', '$stateParams'];

    angular.module('rn-product-details').controller('rn-productDetails.productZoom', ProductZoom);

}());