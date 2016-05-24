(function (angular) {

    'use strict';

    angular
        .module('app.components')
        .controller('AuthController', AuthController);

    function AuthController($rootScope, $scope, $state, $q, Facebook, AuthService) {

        // Define user empty data
        $scope.authResponse = {};
        $scope.user = {};
        $scope.isLoading = true;

        // Defining user isLogged status
        $scope.isLogged = false;

        AuthService.getLoginStatus().then(function (response) {
            $scope.authResponse = response;
            $scope.isLogged = true;
            $scope.isLoading = false;
            $scope.me();
        }, function (reason) {
            $scope.isLoading = false;
            return;
        });

        $scope.$watch(
            function () {
                return Facebook.isReady();
            },
            function (newVal) {
                if (newVal) {
                    $scope.facebookReady = true;
                }
            }
        );

        $scope.IntentLogin = function () {
            if (!$scope.isLogged) {
                $scope.login();
            }
        };

        $scope.login = function () {
            AuthService.login().then(function (response) {
                $scope.authResponse = response;
                $scope.isLogged = true;
                $scope.isLoading = false;
                $scope.me().then(function () {
                    $state.go(appConfig.defaultState, {}, { reload: true });
                });
            });
        };

        $scope.me = function () {
            return $q(function (resolve, reject) {
                AuthService.me().then(function (response) {
                    $scope.user = response;

                    resolve(response);
                })
            });
        };

        $scope.logout = function () {
            AuthService.logout().then(function () {
                $scope.authResponse = {};
                $scope.user = {};
                $scope.isLogged = false;
                $state.go(appConfig.defaultState, {}, { reload: true });
            });
        }

        $scope.$on('Facebook:statusChange', function (ev, data) {
//            console.log('Status: ', data);
//            if (data.status !== 'connected') {
//                console.log('STATE GO LOGIN')
//            }
        });

    }

})(window.angular);
