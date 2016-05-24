(function (angular) {

    'use strict';

    angular
        .module('app.contacts')
        .controller('ContactsController', ContactsController);

    function ContactsController($scope, $timeout, ContactsService) {

        $scope.genders = [
            {value: '', name: 'gender'},
            {value: 'male', name: 'male'},
            {value: 'female', name: 'female'}
        ];
        $scope.statuses = [
            {value: '1', name: 'active'},
            {value: '0', name: 'deleted'}
        ];
        $scope.filters = {
            gender: '',
            status: '1'
        };

        $scope.isLoading = true;
        $scope.hasActiveContact = false;

        $scope.contacts = [];
        $scope.filteredContacts = [];

        ContactsService.getContacts().then(function (data) {
            // @TODO Simulate a loading delay for the demo
            $timeout(function () {
                $scope.isLoading = false;
                $scope.contacts = data.reverse();
                $scope.filterContacts();
            }, appConfig.loadingDelay);
        });

        $scope.filterContacts = function () {
            $scope.filteredContacts = [];

            var filteredContact;
            for (var i = 0, ii = $scope.contacts.length; i < ii; ++i) {

                filteredContact = true;
                for (var filter in $scope.filters) {
                    if ($scope.filters[filter] == '') continue;
                    if ($scope.contacts[i][filter] != $scope.filters[filter]) {
                        filteredContact = false;
                        break;
                    }
                }

                filteredContact && $scope.filteredContacts.push($scope.contacts[i]);
            }
        }

    }
})(window.angular);
