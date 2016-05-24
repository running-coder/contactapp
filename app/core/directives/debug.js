(function (angular) {

    'use strict';

    angular
        .module('app.core')
        .directive('debug', function () {
            return {
                restrict: 'E',
                scope: {
                    expression: '=val'
                },
                template: '<pre>{{debug(expression)}}</pre>',
                link: function (scope) {
                    scope.debug = function (exp) {
                        return angular.toJson(exp, true);
                    };
                }
            }
        });

})(window.angular);
