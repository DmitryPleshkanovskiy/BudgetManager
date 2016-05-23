/**
 * Created by dmitry on 14.04.16.
 */

'use strict';

angular.module("budman")
    .config(function($routeProvider) {
        $routeProvider
            .when('/bm', {
                templateUrl: 'views/budgetmanager/bm.html',
                controller: 'bmCtrl'
            });
    });