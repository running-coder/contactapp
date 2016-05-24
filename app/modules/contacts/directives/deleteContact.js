(function (angular) {

    'use strict';

    angular
        .module('app.contacts')
        .directive('deleteContact', function ($state, $timeout, ContactsService) {
            return {
                restrict: 'A',
                scope: {
                    contact: '='
                },
                link: function (scope, element, attrs) {

                    element.on('click', function (e) {
                        e.preventDefault();
                        e.stopPropagation();

                        var controllerScope = scope.$parent.$parent;

                        element.addClass('loading');
                        ContactsService.deleteContact(scope.contact.contactId).then(function (data) {

                            // @TODO Simulate a loading delay for the demo
                            $timeout(function () {
                                $(element).closest('.list__item').fadeOut(200, function (){
                                    scope.contact.status = '0';
                                    controllerScope.$apply(function () {
                                        controllerScope.filterContacts();
                                    });
                                });
                            }, appConfig.loadingDelay);

                        });
                    });

                }
            }
        });

})(window.angular);
