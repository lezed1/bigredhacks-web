"use strict";
var express = require('express');
var async = require('async');
var enums = require('../models/enum.js');
var app = require('../app');

var MentorRequest = require('../models/mentor_request');
var Mentor = require('../models/mentor');
var User = require('../models/user.js');

var router = express.Router();

module.exports = function(io) {
    /**
     * @api {GET} /mentor Mentor dashboard.
     * @apiName Mentor
     * @apiGroup Mentor
     */
    router.get('/', function (req, res, next) {
        return res.redirect('/mentor/dashboard');
    });

    /**
     * @api {GET} /mentor/dashboard Dashboard of logged in mentor.
     * @apiName Mentor
     * @apiGroup Mentor
     */
    router.get('/dashboard', function (req, res, next) {
        MentorRequest.find({}, function (err, mentorRequests) {
            if (err) console.error(err);
            res.render('mentor/index', {
                mentor: req.mentor,
                title: "Dashboard Home",
                mentorRequests
            });
        });
    });

    /**
     * @api {GET} /mentor/register Registration page for a mentor
     */
    router.get('/register', function (req, res) {
        res.render('register_mentor', {
            title: "Mentor Registration"
        });
    });

    /**
     * @api {GET} /mentor/login Login page for a mentor
     */
    router.get('/login', function (req, res) {
        res.render('mentor/login', {
            title: "Mentor Login"
        });
    });

    /**
     * @api {GET} /mentor/logout Logout the current mentor
     * @apiName Logout
     * @apiGroup Mentor
     */
    router.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    /**
     * @api {POST} /mentor/claim Route for mentors to claim a user
     *
     * @apiParam {String} requestId The mongo id of the request being claimed
     * @apiParam {String} mentorId The mongo id of the mentor making the claim
     */
    router.post('/claim', function (req, res) {
        async.parallel({
            request: function request(callback) {
                MentorRequest.find({'_id' : req.body.requestId}).populate('user').exec(callback);
            },
            mentor: function mentor(callback) {
                Mentor.find({'_id' : req.body.mentorId}, callback);
            }
        }, function(err, result) {
            if (!result.request || !mentor) {
                return res.status(500).send('missing request or mentor');
            } else if (!result.)
        });
        res.redirect('/');
    });

    /**
     * @api {POST} /mentor/register Registration submission for a mentor
     */
    router.post('/register', function (req, res) {
        // TODO: Registration
        res.redirect('/')
    });

    return router;
};
