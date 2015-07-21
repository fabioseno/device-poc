/*global angular*/
angular.module('rn-retail').service('rn-retail.productManager', ['$filter', '$q', '$timeout', 'invoker', function ($filter, $q, $timeout, invoker) {
    'use strict';

    var self = this;

    this.getColor = function (colors, id) {
        var i, color;

        if (colors) {
            for (i = 0; i < colors.length; i += 1) {
                if (colors[i].id === id) {
                    color = colors[i];

                    break;
                }
            }
        }

        return color;
    };

    this.getSize = function (sizes, name) {
        var i, size;

        if (sizes) {
            for (i = 0; i < sizes.length; i += 1) {
                if (sizes[i].name === name) {
                    size = sizes[i];
                    break;
                }
            }
        }

        return size;
    };

    self.getPicture = function (colors, selectedColor) {
        var url = '',
            i;

        if (selectedColor) {
            for (i = 0; i < colors.length; i += 1) {
                if (colors[i].id === selectedColor) {
                    url = colors[i].pictureUrl;
                    break;
                }
            }
        }

        return url;
    };

    self.getFullProduct = function (code) {
        return invoker.invoke('product', 'getFull', { sku: code }).then(function (result) {
            var child, sku, product;
        
            product = result.data;
            
            product.sizes = $filter('rn-retail.orderBySize')(product.sizes);

            if (product.children) {
                for (sku in product.children) {
                    if (sku === code) {
                        child = product.children[sku];
                        
                        product.sku = sku;
                        product.pictureUrl = self.getPicture(product.colors, child.color);
                        product.color = self.getColor(product.colors, child.color);
                        product.size = self.getSize(product.sizes, child.size);
                        break;
                    }
                }
            }
            
            return product;
        });
    };
    
    self.getProduct = function (code) {
        return invoker.invoke('product', 'get', { sku: code }).then(function (result) {
            return result.data;
        });
    };

}]);