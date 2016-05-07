app.factory('loginSrv', ["$http", function($http) {
    var service = {};

    service.login = function(cerdentials) {
        return $http.get(appConfig.webServerUrl + "/authentication", {params: {username: cerdentials.username, password: cerdentials.password}});
    }

    service.loginBackand = function(cerdentials) {
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
    .controller('LoginCtrl',['$scope','$state','loginSrv', function ($scope, $state, loginSrv) {
        var model = {};

        $scope.login = function(data) {
            debugger;
            loginSrv.login(data).then(function(response) {
                if(response.data == "success") {
                    debugger;
                    model.isSuccess = true;
                    $state.go('app.dashboard');
                }else {
                    model.isSuccess = false;
                }
            })
        }

        $scope.model = model;
    }])