(function (angular) {

    'use strict';

    angular
        .module('app.contacts')
        .service('ContactsService', ContactsService);

    function ContactsService($q, ApiService, LocalStorageService) {

        var vm = {};

        vm.getContacts = function () {
            return $q(function(resolve, reject) {
                ApiService.request(
                    'getContacts',
                    {},
                    {
                        params: {
                            userId: LocalStorageService.getItem('AUTH').userId
                        }
                    }
                ).then(
                    function (response) {
                        resolve(response.data.data);
                    },
                    function (error) {
                        reject(error)
                    }
                );
            });
        };

        vm.getContact = function (contactId) {
            return $q(function(resolve, reject) {
                ApiService.request(
                    'getContact',
                    {},
                    {
                        params: {
                            userId: LocalStorageService.getItem('AUTH').userId,
                            contactId: contactId
                        }
                    }
                ).then(
                    function (response) {
                        resolve(response.data.data);
                    },
                    function (error) {
                        reject(error)
                    }
                );
            });
        };

        vm.deleteContact = function (contactId) {
            return $q(function(resolve, reject) {
                ApiService.request(
                    'deleteContact',
                    {},
                    {
                        params: {
                            userId: LocalStorageService.getItem('AUTH').userId,
                            contactId: contactId
                        }
                    }
                ).then(
                    function (response) {
                        resolve(response.data.data);
                    },
                    function (error) {
                        reject(error)
                    }
                );
            });
        };

        vm.createContact = function (formData) {
            return $q(function(resolve, reject) {
                ApiService.request(
                    'createContact',
                    formData,
                    {
                        data: {
                            userId: LocalStorageService.getItem('AUTH').userId
                        }
                    }
                ).then(
                    function (response) {
                        resolve(response.data.data);
                    },
                    function (error) {
                        reject(error)
                    }
                );
            });
        };

        vm.patchContact = function (formData, contactId) {
            return $q(function(resolve, reject) {
                ApiService.request(
                    'patchContact',
                    formData,
                    {
                        params: {
                            contactId: contactId
                        },
                        data: {
                            userId: LocalStorageService.getItem('AUTH').userId
                        }
                    }
                ).then(
                    function (response) {
                        resolve(response.data.data);
                    },
                    function (error) {
                        reject(error)
                    }
                );
            });
        };

        return vm;
    }

})(window.angular);