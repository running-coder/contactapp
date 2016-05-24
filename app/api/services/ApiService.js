(function (angular) {

    'use strict';

    angular
        .module('app.api')
        .factory('ApiService', ApiService);

    function ApiService($http) {

        var apiResource = {
            'getContacts': {
                url: appConfig.getApiUrl('contacts')
            },
            'getContact': {
                url: appConfig.getApiUrl('contacts/:contactId')
            },
            'createContact': {
                method: 'POST',
                url: appConfig.getApiUrl('contacts')
            },
            'putContact': {
                method: 'PUT',
                url: appConfig.getApiUrl('contacts/:contactId')
            },
            'patchContact': {
                method: 'PATCH',
                url: appConfig.getApiUrl('contacts/:contactId')
            },
            'deleteContacts': {
                method: 'DELETE',
                url: appConfig.getApiUrl('contacts')
            },
            'deleteContact': {
                method: 'DELETE',
                url: appConfig.getApiUrl('contacts/:contactId')
            }
        };

        var apiService = {
            // data param is only for POST, PUT or PATCH
            request: function (method, data, config) {

                if (!method) {
                    console.log('Unavailable API method: ' + method);
                    return;
                }

                // Make a copy to break the object reference.
                // Otherwise the url cache is used and it will always use the first
                // request despite providing a different parameter for the url
                var request = $.extend(
                    true,
                    {
                        data: data || {}
                    },
                    config || {},
                    angular.copy(apiResource[method])
                );

                if (request.params) {
                    var regex;
                    for (var param in request.params) {
                        regex = new RegExp(':' + param, 'i');
                        if (regex.test(request.url)) {
                            request.url = request.url.replace(regex, request.params[param]);
                            delete request.params[param];
                        }
                    }
                }

                // Force json headers by default
                if (!request.headers) {
                    request.headers = {
                        'Content-type': 'application/json'
                    }
                }

                return $http(request);
            }
        };

        return apiService;
    }

})(window.angular);
