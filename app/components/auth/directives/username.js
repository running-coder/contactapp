(function (angular) {

    'use strict';

    angular
        .module('app.components')
        .directive('username', function (LocalStorageService) {
            return {
                restrict: 'AE',
                link: function (scope) {
                    scope.auth = LocalStorageService.getItem('AUTH');

                    scope.$watch(function () {
                        return localStorage.getItem('AUTH');
                    }, function (newVal, oldVal) {
                        if (newVal) {
                            newVal = JSON.parse(newVal)
                        }
                        scope.auth = newVal;
                    });

                }
            }
        });

})(window.angular);
