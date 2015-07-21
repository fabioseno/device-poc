/*global angular, cordova*/
(function () {
    'use strict';

    function ProductDetails($timeout, productManager, toaster, $location) {
        var vm = this,
            spinnerOptions = {
                template : "<ion-spinner icon='ios'></ion-spinner>"
            };
        
        function disableSizes(selectedColor) {
            var i, sku, skuData, found;

            if (vm.product.sizes && vm.product.children) {
                for (i = 0; i < vm.product.sizes.length; i += 1) {
                    found = false;

                    for (sku in vm.product.children) {
                        skuData = vm.product.children[sku];

                        if (skuData.color === selectedColor.id && skuData.size === vm.product.sizes[i].name) {
                            found = true;
                            break;
                        }
                    }

                    vm.product.sizes[i].disabled = !found;
                }
            }
        }

        vm.selectedSKU = {};
        
        vm.showImage = function (productCode, colorId) {
            $location.url('productdetails/image?productCode=' + productCode + '&colorId=' + colorId);
        };

        vm.scanCode = function () {
            cordova.plugins.barcodeScanner.scan(
                function (result) {
                    if (result.text) {
                        if (!isNaN(result.text)) {
                            $timeout(function () {
                                if (result.text.charAt(0) === '0') {
                                    result.text = result.text.substring(1);
                                }

                                vm.selectedSKU.sku = result.text;

                                vm.findProduct();
                            });
                        } else {
                            toaster.show('Código de barras inválido [' + result.text + ']');
                        }
                    }
                },
                function () {
                    toaster.show('Erro na leitura do código de barras.');
                }
            );
        };
        
        vm.selectSku = function () {
            var sku, i, child;

            if (vm.product && vm.product.children && vm.product.children) {

                // clean up
                vm.product.color = undefined;
                vm.product.size = undefined;
                vm.product.pictureUrl = undefined;

                /* selected SKU or first */
                if (vm.selectedSKU.sku) {
                    sku = vm.product.children[vm.selectedSKU.sku];
                }

                if (sku) {
                    vm.selectedSKU.color = productManager.getColor(vm.product.colors, sku.color);
                    vm.selectedSKU.size = productManager.getSize(vm.product.sizes, sku.size);
                } else {
                    if (!vm.selectedSKU.color && vm.product.colors.length > 0) {
                        vm.selectedSKU.color = vm.product.colors[0];
                    }
                }

                if (vm.selectedSKU.color) {
                    vm.product.color = vm.selectedSKU.color;
                    vm.product.pictureUrl = vm.selectedSKU.color.pictureUrl;
                }
                
                if (vm.selectedSKU.size) {
                    vm.product.size = vm.selectedSKU.size;
                }

                disableSizes(vm.selectedSKU.color);

                // select first available size
                if (vm.product.sizes) {
                    // clean up invalid size selection
                    if (vm.selectedSKU.size) {
                        for (i = 0; i < vm.product.sizes.length; i += 1) {
                            if (vm.selectedSKU.size.name === vm.product.sizes[i].name && vm.product.sizes[i].disabled) {
                                vm.selectedSKU.size = undefined;
                                break;
                            }
                        }
                    }

                    if (!vm.selectedSKU.size) {
                        for (i = 0; i < vm.product.sizes.length; i += 1) {
                            if (!vm.product.sizes[i].disabled) {
                                vm.selectedSKU.size = vm.product.sizes[i];
                                break;
                            }
                        }
                    }
                }

                // find sku
                if (!sku && vm.selectedSKU.color && vm.selectedSKU.size) {
                    for (i in vm.product.children) {
                        if (vm.product.children[i].color === vm.selectedSKU.color.id && vm.product.children[i].size === vm.selectedSKU.size.name) {

                            child = vm.product.children[i];

                            vm.selectedSKU = {};
                            vm.selectedSKU.sku = i;
                            vm.selectedSKU.color = productManager.getColor(vm.product.colors, child.color);
                            vm.selectedSKU.size = productManager.getSize(vm.product.sizes, child.size);
                            
                            vm.product.color = productManager.getColor(vm.product.colors, child.color);
                            vm.product.size = productManager.getSize(vm.product.sizes, child.size);

                            break;
                        }
                    }
                }
            }
        };

        vm.findProduct = function () {
            var sku = vm.selectedSKU.sku;

            if (sku) {
                // clean up
                vm.selectedSKU.color = undefined;
                vm.selectedSKU.size = undefined;

                toaster.show(null, spinnerOptions);

                productManager.getFullProduct(sku).then(function (product) {
                    vm.product = product;

                    vm.selectSku();

                    toaster.hide();
                }, function (error) {
                    toaster.hide();
                    toaster.show(error.data);
                });
            }
        };

        vm.setAttribute = function (attributeName, value) {
            if (!value.disabled) {
                if (vm.selectedSKU[attributeName] !== value) {
                    vm.selectedSKU[attributeName] = value;

                    vm.selectedSKU.sku = undefined;
                    
                    vm.selectSku();
                }
            }
        };
    }

    ProductDetails.$inject = ['$timeout', 'rn-retail.productManager', 'toaster', '$location'];

    angular.module('rn-product-details').controller('rn-productDetails.search', ProductDetails);

}());