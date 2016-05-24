exports['default'] = {
    routes: function (api) {
        return {

            get: [
                { path: '/:apiVersion/contacts', action: 'getContacts' },
                { path: '/:apiVersion/contacts/:contactId([0-9]+)', action: 'getContact' }
            ],

            post: [
                {path: '/:apiVersion/contacts', action: 'createContact' }
            ],

            put: [
                { path: '/:apiVersion/contacts/:contactId([0-9]+)', action: 'putContact' }
            ],

            patch: [
                { path: '/:apiVersion/contacts/:contactId([0-9]+)', action: 'patchContact' }
            ],

            delete: [
                { path: '/:apiVersion/contacts', action: 'deleteContacts' },
                { path: '/:apiVersion/contacts/:contactId([0-9]+)', action: 'deleteContact' }
            ]

        };
    }
};
