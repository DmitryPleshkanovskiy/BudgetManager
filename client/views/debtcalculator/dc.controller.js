/**
 * Created by dmitry on 07.04.16.
 */

'use strict';

angular.module("budman")
    .controller('dcCtrl', ['$scope', 'transactions', function ($scope, transactions) {
        /*transactions.getTransactions().success(function (data) {
            console.log(data);
            $scope.transactions = data;
        });*/
        $scope.value = 'Hello!';
        $scope.app = {};
        $scope.app.persons = [
            {
                id: 0, 
                name: "Марина",
                value: 0,
                warning: false
            },
            {
                id: 1,
                name: "Юля",
                value: 0,
                warning: false
            },
            {
                id: 2,
                name: "Вася",
                value: 0,
                warning: false
            },
            {
                id: 3,
                name: "Женя",
                value: 0,
                warning: false
            },
            {
                id: 4,
                name: "Дима",
                value: 0,
                warning: false
            }
        ];
        $scope.app.clear = function () {
            for (var i=0; i<this.persons.length; i++) {
                this.persons[i].value=0;
            }
            $scope.app.calcsum();
        };
        $scope.app.calcsum = function () {
            var sum = 0;
            for (var i=0; i<this.persons.length; i++) {
                var value;
                if (value = parseFloat(this.persons[i].value))
                {
                    console.log(value);
                    sum += value;
                    this.persons[i].warning = false;
                } else {
                    if (parseFloat(this.persons[i].value)!=0) {
                        this.persons[i].warning = true;
                    }
                }
            }
            $scope.app.sum = sum;
        };
        
        $scope.app.typoerr = function (warning) {
            if (warning) {
                return "typoerr";
            } else {
                return " ";
            }
        };

        $scope.app.calcsum();
    }]);