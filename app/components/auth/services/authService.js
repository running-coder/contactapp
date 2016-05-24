(function (angular) {

    'use strict';

    angular
        .module('app.components')
        .service('AuthService', AuthService);

    function AuthService($q, Facebook, LocalStorageService) {

        this.getLoginStatus = function () {
            return $q(function (resolve, reject) {
                Facebook.getLoginStatus(
                    function (response) {
                        if (response.status == 'connected') {
                            resolve(response);
                        } else {
                            reject();
                        }
                    },
                    function (error) {
                        reject(error)
                    }
                );
            });
        };

        this.login = function () {
            return $q(function (resolve, reject) {
                Facebook.login(
                    function (response) {
                        if (response.status == 'connected') {
                            resolve(response);
                        } else {
                            reject();
                        }
                    },
                    function (error) {
                        reject(error)
                    }
                );
            });
        };

        this.logout = function () {
            return $q(function (resolve, reject) {
                Facebook.logout(
                    function (response) {
                        LocalStorageService.setItem('AUTH', {
                            userId: 42
                        });
                        resolve(response);
                    },
                    function (error) {
                        reject(error)
                    }
                );
            });
        };

        this.me = function () {
            return $q(function (resolve, reject) {
                Facebook.api('/me',
                    function (response) {
                        LocalStorageService.setItem('AUTH', {
                            name: response.name,
                            userId: response.id
                        });
                        resolve(response);
                    }
                );
            });
        };

    }

})(window.angular);