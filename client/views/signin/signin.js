/**
 * Created by dmitry on 22.05.16.
 */

'use strict';

angular.module("budman")
    .config(function($routeProvider) {
        $routeProvider
            .when('/signin', {
                templateUrl: 'views/signin/signin.html'
                //controller: 'HomeCtrl'
            });
    });