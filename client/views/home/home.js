'use strict';

angular.module("budman")
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home/home.html',
                controller: 'mainCtrl'
            });
    });