/**
 * Created by dmitry on 03.04.16.
 */

angular.module('budman')
    .factory('transactions', ['$http', function ($http) {

        return {
            getTransactions: function () {
                return $http.get('/api/v1/transactions/0')
                    .success(function(data) {
                        return data;
                    })
                    .error(function(data) {
                        return data;
                    });
            },
            addTransaction: function (data) {
                //console.log(data);
                return $http.post('/api/v1/transactions/add', data)
                    .success(function (data, status, headers, config) {
                        //TODO if success
                        return data;
                    })
                    .error(function (data, status, headers, config) {
                        //TODO if error
                        return data;
                    })
            }
        };
        
    }]);