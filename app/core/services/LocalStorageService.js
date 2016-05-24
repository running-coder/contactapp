(function (angular) {

    'use strict';

    angular
        .module('app.core')
        .service('LocalStorageService', LocalStorageService);

    function LocalStorageService() {

        this.setItem = function (key, value) {
            localStorage.setItem(key, JSON.stringify(value));
        };

        this.getItem = function (key) {
            var item = localStorage.getItem(key);
            try {
                item = item && JSON.parse(item || null);
            } catch (e) {}
            return item;
        };

        this.removeItem = function (key) {
            localStorage.removeItem(key);
        };

    }

})(window.angular);