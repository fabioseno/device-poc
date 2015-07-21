/*global angular*/
angular.module('rn-retail').filter('rn-retail.orderBySize', ['$filter', function ($filter) {
    'use strict';

    return function (sizes) {

        var letterDefinition = {
            PP: 1,
            P: 2,
            M: 3,
            G: 4,
            GG: 5
        },
            i,
            j,
            isNumber = true,
            tempObject = {},
            tempArray = [],
            isLetterDefinition = true,
            index,
            result = [];

        if (sizes) {
            for (i = 0; i < sizes.length; i += 1) {
                if (isNaN(sizes[i].name)) {
                    isNumber = false;
                    break;
                }
            }

            if (!isNumber) {

                for (i = 0; i < sizes.length; i += 1) {
                    if (!letterDefinition[sizes[i].name]) {
                        letterDefinition = false;
                        break;
                    }
                }

                if (letterDefinition) {
                    for (i = 0; i < sizes.length; i += 1) {
                        index = letterDefinition[sizes[i].name];
                        if (index) {
                            tempObject[index] = sizes[i];
                        } else {
                            tempObject[0] = sizes[i];
                        }
                    }

                    for (i in tempObject) {
                        result.push(tempObject[i]);
                    }
                } else {
                    for (i = 0; i < sizes.length; i += 1) {
                        try {
                            tempArray.push({ size: parseInt(sizes[i].name.replace('A', '')), original: sizes[i] });
                        } catch (err) {
                        }
                    }

                    sizes = $filter('orderBy')(tempArray, 'size');

                    for (i = 0; i < sizes.length; i += 1) {
                        result.push(sizes[i].original);
                    }
                }
            } else {
                result = $filter('orderBy')(sizes, 'name');
            }
        }

        return result;
    };
}]);