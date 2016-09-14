/**
 * Test config variable system
 */
var chai = require('chai');
var should = chai.should();
var assert = require('chai').assert;
var chaiHttp = require('chai-http');
var app = require('../app.js');

chai.use(chaiHttp);

describe('hardware', function () {
    it('should checkout hardware', function (done) {
        chai.request(app)
            .get('/');
        done();
    });
});

