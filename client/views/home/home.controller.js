/**
 * Created by dmitry on 15.03.16.
 */

angular.module("budman")
    .controller('mainCtrl', ['$scope', 'transactions', function ($scope, transactions) {
        transactions.getTransactions().success(function (data) {
            console.log(data);
            $scope.transactions = data;
        });
    }]);