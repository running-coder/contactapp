(function (angular) {

    'use strict';

    angular
        .module('app.layout', [])
        .config(route);

    function route($stateProvider, $urlRouterProvider, $locationProvider, $urlMatcherFactoryProvider) {

        $stateProvider
            .state('app', {
                abstract: true,
                views: {
                    '': {
                        templateUrl: 'layout/views/layout.html',
                        controller: 'LayoutController'
                    },
                    'header@app': {
                        templateUrl: "layout/partials/header.html"
                    }
                }
            });


        $urlRouterProvider.otherwise(function ($injector) {
            $injector.get('$state').go(appConfig.defaultState);
            return true;
        });

        // Requires server configuration
        $locationProvider.html5Mode(true);
        $urlMatcherFactoryProvider.strictMode(false);

    }

})(window.angular);
