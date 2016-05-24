(function (angular) {

    'use strict';

    angular
        .module('app.contacts', [])
        .config(route);

    function route($stateProvider) {

        $stateProvider
            .state('app.contacts', {
                url: '/',
                views: {
                    'main@app': {
                        templateUrl: "modules/contacts/views/contacts.html",
                        controller: 'ContactsController'
                    }
                }
            })

            .state('app.contacts.create', {
                url: 'create',
                views: {
                    'main@app': {
                        templateUrl: "modules/contacts/views/createContact.html",
                        controller: 'CreateContactController'
                    }
                }
            })

            .state('app.contacts.edit', {
                url: 'edit/{contactId:[0-9]+}',
                views: {
                    'main@app': {
                        templateUrl: "modules/contacts/views/editContact.html",
                        controller: 'EditContactController'
                    }
                }
            })

    }

})(window.angular);
