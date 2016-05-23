/**
 * Created by dmitry on 22.05.16.
 */

'use strict';

angular.module("budman")
    .config(function($routeProvider) {
        $routeProvider
            .when('/signup', {
                templateUrl: 'views/signup/signup.html',
                controller: 'signupCtrl'
            });
    });