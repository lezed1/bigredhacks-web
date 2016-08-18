/**
 * Contains various tests on API endpoints
 */

var assert = require('assert');
var should = require('should');
var request = require('supertest');

function createHTTPStatusTestFn(status) {
    return function(done, url, addon) {
        return function() {
            request(url)
                .get(addon)
                .expect(status) // redirect
                .end(function(err, res) {
                    if (err) return done(err);
                    done();
                });
        };
    };
}

var createRedirectTestFn = createHTTPStatusTestFn(302);
var createOkayTestFn = createHTTPStatusTestFn(200);

function createLazyTestWrapper(fn, url, addon) {
    return function() {
        describe('test ' + addon, function () {
            it('tests ' + addon, function (done) {
                fn(done, url, addon)();
            })
        });
    }
}

describe('API Private Endpoints', function() {
    const url = 'localhost:3000';
    it('should fail/redirect on all requests since they are private', function (done) {
        createLazyTestWrapper(createRedirectTestFn, url, '/admin/dashboard')();
        createLazyTestWrapper(createRedirectTestFn, url, '/admin/search')();
        createLazyTestWrapper(createRedirectTestFn, url, '/admin/review')();
        createLazyTestWrapper(createRedirectTestFn, url, '/admin/businfo')();
        createLazyTestWrapper(createRedirectTestFn, url, '/admin/checkin')();
        createLazyTestWrapper(createRedirectTestFn, url, '/admin/reimbursements')();
        createLazyTestWrapper(createRedirectTestFn, url, '/admin/settings')();

        createLazyTestWrapper(createRedirectTestFn, url, '/user/dashboard')();
        createLazyTestWrapper(createRedirectTestFn, url, '/user/dashboard/edit')();
        done();
    });
});

describe('API Public Endpoints', function() {
    this.slow(1000);
    this.timeout(5000);
    const url = 'localhost:3000';
    it('should succeed on all requests since they are public', function (done) {
        createLazyTestWrapper(createOkayTestFn, url, '/')();
        createLazyTestWrapper(createOkayTestFn, url, '/login')();
        createLazyTestWrapper(createOkayTestFn, url, '/forgotpassword')();
        createLazyTestWrapper(createOkayTestFn, url, '/register')();
        done();
    });
});
