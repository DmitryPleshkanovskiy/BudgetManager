/**
 * Created by dmitry on 08.04.16.
 */

'use strict';

angular.module("budman")
    .config(function($routeProvider) {
        $routeProvider
            .when('/addnew', {
                templateUrl: 'views/add_transaction/add_transaction.html',
                controller: 'addtransactionCtrl'
            });
    });