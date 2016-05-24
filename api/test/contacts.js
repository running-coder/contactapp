process.env.NODE_ENV = 'test';

var should = require('should');
var actionheroPrototype = require('actionhero').actionheroPrototype;
var actionhero = new actionheroPrototype();
var api;

describe('Contacts API Tests', function () {

    before(function (done) {
        actionhero.start(function (err, a) {
            api = a;
            done();
        })
    });

    after(function (done) {
        actionhero.stop(function (err) {
            done();
        });
    })

    it('should have booted into the test env', function () {
        process.env.NODE_ENV.should.equal('test');
        api.env.should.equal('test');
        should.exist(api.id);
    });

    it('test for an unknown action', function (done) {
        api.specHelper.runAction('unknownAction', function (response) {
            response.error.should.equal('Error: unknown action or invalid apiVersion');
            done();
        });
    });

    it('test for createContact action (POST)', function (done) {
        api.specHelper.runAction(
            'createContact',
            {
                'userId': '42',
                'name': 'test name',
                'gender': 'test male',
                'jobTitle': 'test jobTitle',
                'address': 'test address',
                'phoneNumbers': 'test phoneNumbers',
                'email': 'test email',
                'picture': 'test picture'
            },
            function (response) {

                response.status.should.equal(true);
                response.data.should.be.an.instanceOf(Object)
                response.data.userId.should.equal(42);

                done();
            }
        );
    });

    it('test for getContact action (GET)', function (done) {
        api.specHelper.runAction(
            'getContact',
            {
                'userId': '42',
                'contactId': '1'
            },
            function (response) {

                response.status.should.equal(true);
                response.data.should.be.an.instanceOf(Object);
                response.data.name.should.equal('test name');

                done();
            }
        );
    });

    it('test for create multiple and getContacts action (GET)', function (done) {
        api.specHelper.runAction(
            'createContact',
            {
                'userId': '42',
                'name': 'second test name',
                'gender': 'second test gender',
                'jobTitle': 'second test jobTitle',
                'address': 'second test address',
                'phoneNumbers': 'second test phoneNumbers',
                'email': 'second test email',
                'picture': 'second test picture'
            },
            function () {
                api.specHelper.runAction(
                    'getContacts',
                    {
                        'userId': '42'
                    },
                    function (response) {

                        response.status.should.equal(true);
                        response.data.should.be.an.instanceOf(Array);
                        response.data.length.should.equal(2);

                        done();
                    }
                );
            }
        );
    });

    it('test for putContact action (PUT)', function (done) {
        api.specHelper.runAction(
            'putContact',
            {
                'userId': '42',
                'contactId': '2',
                'name': 'second test name (edited)',
                'gender': 'second test gender (edited)',
                'jobTitle': 'second test jobTitle (edited)',
                'address': 'second test address (edited)',
                'phoneNumbers': 'second test phoneNumbers (edited)',
                'email': 'second test email (edited)',
                'picture': 'second test picture (edited)',
                'status': '1'
            },
            function () {
                api.specHelper.runAction(
                    'getContacts',
                    {
                        'userId': '42'
                    },
                    function (response) {

                        response.status.should.equal(true);
                        response.data.should.be.an.instanceOf(Array);
                        response.data[1].name.should.equal('second test name (edited)');

                        done();
                    }
                );
            }
        );
    });

    it('test for patchContact action (PATCH)', function (done) {
        api.specHelper.runAction(
            'patchContact',
            {
                'userId': '42',
                'contactId': '2',
                'jobTitle': 'second test jobTitle (edited)(patched)'
            },
            function () {
                api.specHelper.runAction(
                    'getContact',
                    {
                        'userId': '42',
                        'contactId': '2'
                    },
                    function (response) {

                        response.status.should.equal(true);
                        response.data.should.be.an.instanceOf(Object);
                        response.data.name.should.equal('second test name (edited)');
                        response.data.jobTitle.should.equal('second test jobTitle (edited)(patched)');

                        done();
                    }
                );
            }
        );
    });

    it('test for deleteContact action (DELETE)', function (done) {
        api.specHelper.runAction(
            'deleteContact',
            {
                'userId': '42',
                'contactId': '1'
            },
            function () {
                api.specHelper.runAction(
                    'getContact',
                    {
                        'userId': '42',
                        'contactId': '1'
                    },
                    function (response) {

                        response.status.should.equal(true);
                        response.data.should.be.an.instanceOf(Object);
                        response.data.status.should.equal('0');

                        done();
                    }
                );
            }
        );
    });

    it('test for deleteContacts action (DELETE)', function (done) {
        api.specHelper.runAction(
            'deleteContacts',
            {
                'userId': '42'
            },
            function () {
                api.specHelper.runAction(
                    'getContacts',
                    {
                        'userId': '42'
                    },
                    function (response) {

                        response.status.should.equal(true);
                        response.data.should.be.an.instanceOf(Array);

                        for (i = 0, ii = response.data.length; i < ii; ++i) {
                            response.data[i].status.should.equal('0');
                        }

                        done();
                    }
                );
            }
        );
    });

});
