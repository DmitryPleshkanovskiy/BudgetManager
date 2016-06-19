/**
 * Created by dmitry on 14.04.16.
 */

'use strict';

angular.module("budman")
    .controller('bmCtrl', ['$rootScope', '$scope', '$location', 'transactions', function($rootScope, $scope, $location, transactions) {
        transactions.getTransactions().success(function (data) {
            console.log(data);
            $scope.transactions = data;
        });

        // console.log('hello');

        /*$scope.signin = function() {
            var formData = {
                email: $scope.email,
                password: $scope.password
            };

            Main.signin(formData, function(res) {
                if (res.type == false) {
                    alert(res.data)
                } else {
                    $localStorage.token = res.data.token;
                    window.location = "/";
                }
            }, function() {
                $rootScope.error = 'Failed to signin';
            })
        };

        $scope.signup = function() {
            var formData = {
                email: $scope.email,
                password: $scope.password
            };

            Main.save(formData, function(res) {
                if (res.type == false) {
                    alert(res.data)
                } else {
                    $localStorage.token = res.data.token;
                    window.location = "/"
                }
            }, function() {
                $rootScope.error = 'Failed to signup';
            })
        };

        $scope.me = function() {
            Main.me(function(res) {
                $scope.myDetails = res;
            }, function() {
                $rootScope.error = 'Failed to fetch details';
            })
        };

        $scope.logout = function() {
            Main.logout(function() {
                window.location = "/"
            }, function() {
                alert("Failed to logout!");
            });
        };
        $scope.token = $localStorage.token;*/
    }]);