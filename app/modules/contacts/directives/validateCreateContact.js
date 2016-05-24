(function (angular) {

    'use strict';

    angular
        .module('app.contacts')
        .directive('validateCreateContact', function ($state, $timeout, ContactsService) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {


                    typeof $.validate === "function" && $.validate({
                        submit: {
                            settings: {
                                form: '.js-form-create-contact'
                            },
                            callback: {
                                onSubmit: function (node, formData) {

                                    disableFormInputs(true);
                                    ContactsService.createContact(formData).then(function (response) {
                                        // @TODO Simulate a loading delay for the demo
                                        $timeout(function () {
                                            $state.go('app.contacts');
                                            disableFormInputs(false);
                                        }, appConfig.loadingDelay);
                                    }, function (error) {
                                        //@TODO: Display error.statusText?
                                        disableFormInputs(false);
                                    });

                                    return false;
                                }
                            }
                        }
                    });

                    function disableFormInputs(state) {
                        $(element).find('.form-control')
                            .attr('readonly', !!state ? 'readonly': '')
                            .end()
                            .find('[type="submit"]')
                            .toggleClass('loading', !!state);
                    }

                }
            }
        });

})(window.angular);
