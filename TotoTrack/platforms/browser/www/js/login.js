app.factory('loginSrv', ["$http",'Backand', function($http, Backand) {
    var service = {};

    service.login = function(cerdentials) {
        return $http.get(appConfig.webServerUrl + "/authentication", {params: {username: cerdentials.username, password: cerdentials.password}});
    }

    service.loginBackand = function(cerdentials) {
        return $http ({
            method: 'GET',
            url: Backand.getApiUrl() + '/1/query/data/intersectUsernamePassword',
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
            loginSrv.loginBackand(data).then(function(response) {
                debugger;
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