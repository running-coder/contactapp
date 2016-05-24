(function (angular) {

    'use strict';

    angular
        .module('app.contacts')
        .directive('slideLabel', function () {
            return {
                restrict: 'EA',
                link: function (scope, element, attrs) {

                    element.find('input').on('input', function () {
                        element.toggleClass('has-text', !!$(this).val());
                    });

                }
            }
        });

})(window.angular);
