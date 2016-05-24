(function (angular) {

    'use strict';

    angular
        .module('app.components')
        .directive('auth', function () {
            return {
                restrict: 'E',
                controller: 'AuthController',
                templateUrl: 'components/auth/views/auth.tpl.html',
                link: function (scope) {

                }
            }
        });

})(window.angular);
