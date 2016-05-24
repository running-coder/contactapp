exports.getContacts = {
    version: 'v1',
    name: 'getContacts',
    description: 'Get the list of contacts for a userId',
    inputs: {
        userId: {
            required: true,
            formatter: function (param) {
                return parseInt(param);
            }
        }
    },
    outputExample: {},
    run: function (api, data, next) {

        api.contacts.getAll(
            data.params.userId,
            function (error, response) {

                data.response.status = true;
                data.response.data = response;
                next(error);

            }
        );

    }
};

exports.getContact = {
    version: 'v1',
    name: 'getContact',
    description: 'Get a contact from a contactId',
    inputs: {
        userId: {
            required: true,
            formatter: function (param) {
                return parseInt(param);
            }
        },
        contactId: {
            required: true,
            formatter: function (param) {
                return parseInt(param);
            }
        }
    },
    outputExample: {},
    run: function (api, data, next) {

        api.contacts.get(
            data.params.userId,
            data.params.contactId,
            function (error, response) {

                data.response.status = true;
                data.response.data = response;
                next(error);

            }
        );

    }
};

exports.createContact = {
    version: 'v1',
    name: 'createContact',
    description: 'Create a new contact for a userId',
    inputs: {
        userId: {
            required: true,
            formatter: function (param) {
                return parseInt(param);
            }
        },
        name: {
            required: true
        },
        gender: {
            required: true
        },
        jobTitle: {
            required: true
        },
        address: {
            required: true
        },
        phoneNumbers: {
            required: true
        },
        email: {
            required: true
        },
        picture: {
            required: false,
            default: function (param) {
                return 'n/a';
            }
        }
    },
    outputExample: {},
    run: function (api, data, next) {

        api.contacts.create(
            data.params.userId,
            data.params.name,
            data.params.gender,
            data.params.jobTitle,
            data.params.address,
            data.params.phoneNumbers,
            data.params.email,
            data.params.picture,
            function (error, response) {

                data.response.status = true;
                data.response.data = response;
                next(error);

            }
        );

    }
};

exports.putContact = {
    version: 'v1',
    name: 'putContact',
    description: 'Put an existing contact for a userId',
    inputs: {
        userId: {
            required: true,
            formatter: function (param) {
                return parseInt(param);
            }
        },
        contactId: {
            required: true,
            formatter: function (param) {
                return parseInt(param);
            }
        },
        name: {
            required: true
        },
        gender: {
            required: true
        },
        jobTitle: {
            required: true
        },
        address: {
            required: true
        },
        phoneNumbers: {
            required: true
        },
        email: {
            required: true
        },
        picture: {
            required: true
        },
        status: {
            required: true,
            formatter: function (param) {
                return parseInt(param);
            }
        }
    },
    outputExample: {},
    run: function (api, data, next) {

        api.contacts.put(
            data.params.userId,
            data.params.contactId,
            data.params.name,
            data.params.gender,
            data.params.jobTitle,
            data.params.address,
            data.params.phoneNumbers,
            data.params.email,
            data.params.picture,
            data.params.status,
            function (error, response) {

                data.response.status = true;
                data.response.data = response;
                next(error);

            }
        );

    }
};

exports.patchContact = {
    version: 'v1',
    name: 'patchContact',
    description: 'Patch an existing contact for a userId',
    inputs: {
        userId: {
            required: true,
            formatter: function (param) {
                return parseInt(param);
            }
        },
        contactId: {
            required: true,
            formatter: function (param) {
                return parseInt(param);
            }
        },
        name: {
            required: false
        },
        gender: {
            required: false
        },
        jobTitle: {
            required: false
        },
        address: {
            required: false
        },
        phoneNumbers: {
            required: false
        },
        email: {
            required: false
        },
        picture: {
            required: false
        },
        status: {
            required: false,
            formatter: function (param) {
                return parseInt(param);
            }
        }
    },
    outputExample: {},
    run: function (api, data, next) {

        api.contacts.patch(
            data.params.userId,
            data.params.contactId,
            data.params,
            function (error, response) {

                data.response.status = true;
                data.response.data = response;
                next(error);

            }
        );

    }
};


exports.deleteContact = {
    version: 'v1',
    name: 'deleteContact',
    description: 'Delete a contact for a userId',
    inputs: {
        userId: {
            required: true,
            formatter: function (param) {
                return parseInt(param);
            }
        },
        contactId: {
            required: true,
            formatter: function (param) {
                return parseInt(param);
            }
        }
    },
    outputExample: {},
    run: function (api, data, next) {

        api.contacts.delete(
            data.params.userId,
            data.params.contactId,
            function (error) {

                data.response.status = true;
                next(error);

            }
        );

    }
};

exports.deleteContacts = {
    version: 'v1',
    name: 'deleteContacts',
    description: 'Delete all contacts for a userId',
    inputs: {
        userId: {
            required: true,
            formatter: function (param) {
                return parseInt(param);
            }
        }
    },
    outputExample: {},
    run: function (api, data, next) {

        api.contacts.deleteAll(
            data.params.userId,
            function (error) {

                data.response.status = true;
                next(error);

            }
        );

    }
};