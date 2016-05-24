module.exports = {
    loadPriority: 1000,
    startPriority: 1000,
    stopPriority: 1000,
    initialize: function (api, next) {
        var redis = api.redis.client;

        api.contacts = {

            get: function (userId, contactId, next) {
                var contactKey = this.buildContactKey(userId, contactId);

                redis.hgetall(contactKey, function (error, data) {
                    next(error, data);
                });

            },

            getAll: function (userId, next) {

                var contactListKey = this.buildContactListKey(userId);

                redis.lrange(contactListKey, 0, -1, function (error, contactList) {

                    if (!contactList || !contactList.length) {
                        next(error, contactList);
                        return;
                    }

                    var multi = redis.multi();

                    for (var i = 0, ii = contactList.length; i < ii; ++i) {
                        multi.hgetall(contactList[i]);
                    }

                    multi.exec(function (error, contactData) {
                        next(error, contactData);
                    });
                });

            },

            create: function (userId, name, gender, jobTitle, address, phoneNumbers, email, picture, next) {

                var contactListKey = this.buildContactListKey(userId),
                    scope = this;

                redis.llen(contactListKey, function (error, contactListLength) {

                    var contactId = contactListLength + 1,
                        contactKey = scope.buildContactKey(userId, contactId),
                        data = {
                            userId: userId,
                            contactId: contactId,
                            name: name,
                            gender: gender,
                            jobTitle: jobTitle,
                            address: address,
                            phoneNumbers: phoneNumbers,
                            email: email,
                            picture: picture,
                            status: 1,
                            createdAt: new Date().getTime(),
                            updatedAt: new Date().getTime()
                        };

                    redis.hmset(contactKey, data, function (error) {
                        if (error) {
                            next(error);
                            return;
                        }
                        redis.rpush(contactListKey, contactKey, function (error) {
                            next(error, data);
                        });
                    });
                });

            },

            put: function (userId, contactId, name, gender, jobTitle, address, phoneNumbers, email, picture, status, next) {

                var contactKey = this.buildContactKey(userId, contactId),
                    data = {
                        name: name,
                        gender: gender,
                        jobTitle: jobTitle,
                        address: address,
                        phoneNumbers: phoneNumbers,
                        email: email,
                        picture: picture,
                        status: 1,
                        updatedAt: new Date().getTime()
                    };

                redis.hmset(contactKey, data, function (error, data) {
                    next(error, data);
                });

            },

            patch: function (userId, contactId, params, next) {

                var contactKey = this.buildContactKey(userId, contactId),
                    allowedParams = ['name', 'gender', 'jobTitle', 'address', 'phoneNumbers', 'email', 'picture', 'status'];

                var multi = redis.multi();

                for (var param in params) {
                    if (!~allowedParams.indexOf(param)) continue;
                    multi.hset(contactKey, param, params[param]);
                }
                multi.hset(contactKey, 'updatedAt', new Date().getTime());

                multi.exec(function (error, contactData) {
                    next(error, contactData);
                });

            },

            delete: function (userId, contactId, next) {

                var contactKey = this.buildContactKey(userId, contactId);

                redis.hmset(contactKey, {
                    status: 0,
                    updatedAt: new Date().getTime()
                }, function (error) {
                    next(error);
                });

            },

            deleteAll: function (userId, next) {

                var contactListKey = this.buildContactListKey(userId);

                redis.lrange(contactListKey, 0, -1, function (error, contactList) {

                    if (!contactList || !contactList.length) {
                        next(error, contactList);
                        return;
                    }

                    var multi = redis.multi();

                    for (var i = 0, ii = contactList.length; i < ii; ++i) {
                        multi.hmset(contactList[i], {
                            status: 0,
                            updatedAt: new Date().getTime()
                        });
                    }

                    multi.exec(function (error) {
                        next(error);
                    });
                });

            },

            // helpers

            buildContactKey: function (userId, contactId) {
                return 'Contact:' + userId + ":" + contactId;
            },

            buildContactListKey: function (userId) {
                return 'ContactList:' + userId;
            }

        };

        next();
    },
    start: function (api, next) {

        next();

    },
    stop: function (api, next) {
        next();
    }
};
