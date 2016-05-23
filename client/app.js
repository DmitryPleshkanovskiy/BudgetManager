/**
 * Created by dmitry on 15.03.16.
 */

var app = angular.module('budman', ['ngRoute']);

app.config(function ($routeProvider, $locationProvider, $httpProvider) {

    $routeProvider
        .otherwise({
            redirectTo: '/'
        });

    $locationProvider.html5Mode(true);
});