(function (angular) {

    'use strict';

    angular.module('app', [

            // Angular Components
            'ui.router',
            'angularMoment',
            'facebook',
            'xeditable',

            // App Core
            'app.core',
            'app.api',
            'app.components',

            // App Modules
            'app.layout',
            'app.contacts'

        ])

        .config([
            'FacebookProvider',
            function (FacebookProvider) {
                FacebookProvider.init('1109903002387978');
            }
        ])

        .run(function (editableOptions, editableThemes) {
            editableOptions.theme = 'bs3';
            editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn--action"><i class="fa fa-check"></i></button>';
            editableThemes['bs3'].cancelTpl = '<button type="button" class="btn btn--default" ng-click="$form.$cancel()"><i class="fa fa-times"></i></button>';
        })

        .run(function (LocalStorageService) {
            var auth = LocalStorageService.getItem('AUTH');
            if (!auth || !auth.userId) {
                LocalStorageService.setItem('AUTH', {
                    userId: 42
                });
            }
        });

})(window.angular);
