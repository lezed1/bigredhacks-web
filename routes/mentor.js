"use strict";
var express = require('express');
var async = require('async');
var User = require('../models/user.js');
var enums = require('../models/enum.js');
var MentorRequest = require('../models/mentor_request');

module.exports = function (io) {
    var router = express.Router();

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
            user: req.user,
            enums: enums,
            error: req.flash('error'),
            title: "Dashboard Home"
        });
    });

    /**
     * @api {GET} /mentor/requestsqueue See requests queue of mentor.
     * @apiName RequestQueue
     * @apiGroup Mentor
     */
    router.get('/dashboard/requestsqueue', function (req, res) {
        var user = req.user;
        MentorRequest.find({}).exec(function(err, mentorRequests) {
            var allRequests = [];
            async.each(mentorRequests, function(mentorRequest, callback) {
                mentorRequest.match = "no";
                if(_matchingSkills(user.mentorinfo.skills, mentorRequest.skills)) {
                    mentorRequest.match = "yes";
                }
                allRequests.push(mentorRequest);
                callback();
            }, function(err) {
                if (err) console.error(err);
                else {
                    res.render('mentor/requests_queue', {
                        user: user,
                        mentorRequests: allRequests,
                        title: "Requests Queue"
                    });
                }
            });
        });
    });

    /* Handles a mentor-triggered event */
    io.on('connection', function (socket) {
        //receive event of a mentor claiming or unclaiming a user request
        socket.on('set request status', function (setRequestStatus) {
            MentorRequest.findOne({pubid: setRequestStatus.mentorRequestPubid}, function (err, mentorRequest) {
                if (err) console.error(err);
                else {
                    User.findOne({pubid: setRequestStatus.mentorPubid}, function (err, mentorOfRequest) {
                        if (setRequestStatus.newStatus == "Claimed") {
                            mentorRequest.mentor.name = mentorOfRequest.name.first + " " + mentorOfRequest.name.last;
                            mentorRequest.mentor.company = mentorOfRequest.mentorinfo.company;
                            mentorRequest.mentor.id = mentorOfRequest.id;
                            mentorRequest.requeststatus = "Claimed";
                        } else if (setRequestStatus.newStatus == "Unclaimed") {
                            mentorRequest.mentor.name = null;
                            mentorRequest.mentor.company = null;
                            mentorRequest.mentor.id = null;
                            mentorRequest.requeststatus = "Unclaimed";
                        }
                        mentorRequest.save(function (err) {
                            if (err) console.error(err);
                            else {
                                var requestStatus = {
                                    mentorRequestPubid: setRequestStatus.mentorRequestPubid,
                                    mentorPubid: setRequestStatus.mentorPubid,
                                    newStatus: setRequestStatus.newStatus,
                                    nummatchingmentors: mentorRequest.nummatchingmentors,
                                    mentorInfo: {
                                        name: mentorOfRequest.name.first + " " + mentorOfRequest.name.last,
                                        company: mentorOfRequest.mentorinfo.company,
                                        companyImage: _getCompanyImage(mentorOfRequest.mentorinfo.company)
                                    }
                                };
                                User.findOne({_id: mentorRequest.user.id}, function (err, user) {
                                    if (err) console.error(err);
                                    else {
                                        User.find({role: 'mentor'}).exec(function (err, mentors) {
                                            if (err) console.error(err);
                                            else {
                                                async.each(mentors, function (mentor, callback) {
                                                    io.emit('new request status ' + mentor.pubid, requestStatus);
                                                    callback();
                                                }, function (err) {
                                                    if (err) console.error(err);
                                                    else {
                                                        io.emit('new request status ' + user.pubid, requestStatus);
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    });
                }
            });
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

    return router;
};