'use strict';

var appConfig = {};

appConfig.defaultState = "app.contacts";

appConfig.environment = 'dev';
appConfig.loadingDelay = 250;

appConfig.apiBasePath = {
    dev: 'http://127.0.0.1:8080/api/v1/',
    stage: '',
    prod: ''
};

appConfig.getApiUrl = function (path) {
    return appConfig.apiBasePath[appConfig.environment] + path + (appConfig.environment === "mock" ? ".json" : "");
};