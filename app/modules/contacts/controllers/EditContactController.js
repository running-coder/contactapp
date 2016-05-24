(function (angular) {

    'use strict';

    angular
        .module('app.contacts')
        .controller('EditContactController', EditContactController);

    function EditContactController($scope, $state, $timeout, ContactsService) {

        $scope.isLoading = true;
        $scope.contact = {};
        $scope.genders = [
            {value: 'male', name: 'male'},
            {value: 'female', name: 'female'}
        ];
        $scope.statuses = [
            {value: '1', name: 'active'},
            {value: '0', name: 'deleted'}
        ];

        ContactsService.getContact($state.params.contactId).then(function (data) {
            if (!data) {
                $state.go(appConfig.defaultState);
                return;
            }

            // @TODO Simulate a loading delay for the demo
            $timeout(function () {
                $scope.isLoading = false;
                $scope.contact = data;
            }, appConfig.loadingDelay);
        });

        $scope.patchContact = function (data) {
            ContactsService.patchContact(data, $state.params.contactId).then(function (data) {

            });
        }

    }
})(window.angular);
