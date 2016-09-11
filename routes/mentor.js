"use strict";
var express = require('express');
var async = require('async');
var enums = require('../models/enum.js');
var app = require('../app');

var MentorRequest = require('../models/mentor_request');
var User = require('../models/user.js');

var router = express.Router();
var io = app.io;

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
    res.render('mentor/index', {
        mentor: req.mentor,
        title: "Dashboard Home"
    });
});

/**
 * @api {GET} /mentor/register Registration page for a mentor
 */
router.get('/register', function(req, res) {
    res.render('register_mentor', {
        title: "Mentor Registration"
    });
});

/**
 * @api {GET} /mentor/login Login page for a mentor
 */
router.get('/login', function(req, res) {
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
 * @api {POST} /mentor/register Registration submission for a mentor
 */
router.post('/register', function(req, res) {
    // TODO: Registration
    res.redirect('/')
});

module.exports = router;