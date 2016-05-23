
'use strict';

function getCurrentDate() {
    var date = new Date;
    var day = date.getDate();
    if (day < 10) {
        day = '0' + day;
    }
    var month = date.getMonth() + 1;
    if (month < 10) {
        month = '0' + month;
    }
    return date.getFullYear() + '.' + month + '.' + day;
}

angular.module("budman")
    .controller('addtransactionCtrl', ['$scope', 'transactions', '$http', function ($scope, transactions, $http) {
        $scope.app = {};
        /*$scope.app.values = {
            date: "",
            items: []
        }*/
        $scope.app.values = {
            date: getCurrentDate(),
            sum: 0,
            description: ""
        };

        $scope.app.addNewItem = function () {
            console.log($scope.app.values);
            transactions.addTransaction($scope.app.values).success(function () {
                
            });
            /*$http({
                method: 'POST',
                url: '/api/v1/transactions/add',
                data: JSON.stringify({"hi": "hello"})//$scope.app.values
            })
            .success(function () {
                console.log('posted')
            })
            .error(function () {

            })*/
            /*var url = '/api/v1/transactions/add';
            $.ajax({
                url: url,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    name:"Bob"
                }),
                // processData: false, // this is optional
                dataType: 'json'
            });*/
        };
    }]);