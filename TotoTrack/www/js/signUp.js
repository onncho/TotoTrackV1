app.factory('signUpSrv', ["$http", function($http) {
        var service = {};

        service.login = function(cerdentials) {
            return $http.get(appConfig.webServerUrl + "/authentication", {params: {username: cerdentials.username, password: cerdentials.password}});
        }

        service.signUpBackand = function(cerdentials) {
            return $http ({
                method: 'GET',
                url: appConfig.backand + '/1/query/data/intersectUsernamePassword',
                params: {
                    parameters: {
                        usernameInput: cerdentials.username,
                        passwordInput: cerdentials.password
                    }
                }
            })
        }

        return service;

    }])
    .controller('signUpCtrl',['$scope','$state','signUpSrv', function ($scope, $state, signUpSrv) {
        var model = {};
        
        $scope.signUp = function (data) {
            signUpSrv.signUpBackand(data).then(function (response) {
                if(response.data == "success") {
                    model.isSuccess = true;
                    $state.go('app.dashboard');
                } else {
                    model.isSuccess = false;
                }
            })
        }

        $scope.model = model;
    }])