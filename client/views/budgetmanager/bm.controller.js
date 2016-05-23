/**
 * Created by dmitry on 14.04.16.
 */

angular.module("budman")
    .controller('bmCtrl', ['$scope', 'transactions', function ($scope, transactions) {
        transactions.getTransactions().success(function (data) {
            console.log(data);
            $scope.transactions = data;
        });
    }]);