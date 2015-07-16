/*global angular, cordova*/
(function () {
    'use strict';

    function Search($rootScope, $timeout, toaster) {
        var vm = this,
            spinnerOptions = {
                template : "<ion-spinner icon='ios'></ion-spinner>"
            };

        vm.skus = [];

        vm.clearList = function () {
            navigator.notification.confirm('Deseja limpar a lista?', function (buttonIndex) {
                if (buttonIndex === 1) {
                    $timeout(function () {
                        vm.skus = [];
                    });
                }
            });
        };
        
        vm.getAverageTime = function () {
            var i, sku, totalScan = 0, countScan = 0, averageScan = 0;
            
            for (i = 0; i < vm.skus.length; i += 1) {
                sku = vm.skus[i];
                
                if (sku.scanTime) {
                    countScan += 1;
                    totalScan += sku.scanTime;
                }
            }
            
            if (countScan) {
                averageScan = totalScan / countScan;
            }
            
            return averageScan.toFixed(1);
        };

        vm.scanCode = function () {
            var startTime = new Date().getTime(), sku, scanTime;
            
            cordova.plugins.barcodeScanner.scan(
                function (result) {
                    if (result.text) {
                        $timeout(function () {
                            scanTime = Math.abs(new Date().getTime() - startTime);
                            
                            sku = {
                                sku: result.text,
                                scanTime: scanTime
                            };

                            vm.skus.splice(0, 0, sku);
                            
                            $timeout(function () {
                                vm.scanCode();
                            });
                        });
                    }
                },
                function () {
                    toaster.show('Erro na leitura do código de barras.');
                }
            );
        };

    }

    Search.$inject = ['$rootScope', '$timeout', 'toaster'];

    angular.module('rn-device').controller('rn-device.search', Search);

}());