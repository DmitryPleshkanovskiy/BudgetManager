'use strict';

angular.module("budman")
    .config(function($routeProvider) {
        $routeProvider
            .when('/dc', {
                templateUrl: 'views/debtcalculator/dc.html',
                controller: 'dcCtrl'
            });
    });