/**
 * Created by Nick on 05.03.2016.
 */

'use strict';

angular.module('budman')
    .directive('navBar', function () {
        return {
            restrict: 'E',
            templateUrl: 'directives/nav-bar/nav-bar.html'
        };
    });