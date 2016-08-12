"use strict";

var async = require('async');
var CronJob = require('cron').CronJob;

var config = require('../config.js');
var email = require('./email');

var User = require('../models/user.js');

module.exports.go = function go() {
    // Regular decision deadline processing
    const TIME_ZONE = 'America/New_York';
    const EVERY_EIGHT_HOURS = '00 * * * * *';
    const DAY_IN_MILLIS = 1000 * 60 * 60 * 24;


    new CronJob(EVERY_EIGHT_HOURS, function checkDecisionDeadlines() {
        // TODO: Remove this error once we are confident this is running every 8 hours (#112)
        console.log('[debug error] cron running');
        const DATE_FOR_WARNING = new Date(Date.now() - DAY_IN_MILLIS * (Number(config.admin.days_to_rsvp) - 1)); // One day in advance

        User.find({
            $and: [
                {"internal.status": "Accepted"},
                {"internal.notificationStatus": "Accepted"},
                {"internal.going": null},
                {"internal.lastNotifiedAt": {$lt: DATE_FOR_WARNING}}
            ]
        }, function (err, users) {
            if (err) {
                return void console.error(err);
            }

            const MAX_CONCURRENT_REQUESTS = 3;
            async.eachLimit(users, MAX_CONCURRENT_REQUESTS, _warnOrRejectUser, function (err) {
                if (err) {
                    console.error('ERROR in CRON email function: ' + err);
                }
            });
        });
    }, null, true, TIME_ZONE);

    // Warns or rejects a user if they are past deadline
    function _warnOrRejectUser(user, callback) {
        const DATE_FOR_REJECTION = new Date(Date.now() - DAY_IN_MILLIS * (Number(config.admin.days_to_rsvp)));
        const config = {
            "from_email": "info@bigredhacks.com",
            "from_name": "BigRed//Hacks",
            "to": {
                "email": user.email,
                "name": user.name.full
            }
        };
        // Check whether user needs to be rejected or warned
        if (user.internal.lastNotifiedAt < DATE_FOR_REJECTION) {
            // Reject
            user.internal.status = 'Rejected';
            // Send email immediately to prevent concurrency RSVP issues
            email.sendDecisionEmail(user.name.first, user.internal.notificationStatus, user.internal.status, config, function (err) {
                if (err) {
                    return void callback(err);
                } else {
                    user.internal.lastNotifiedAt = Date.now();
                    user.internal.notificationStatus = 'Rejected';
                    return void user.save(callback);
                }
            });
        } else {
            if (!user.internal.deadlineWarned) {
                // Warn
                user.internal.deadlineWarned = true;
                user.save(function (err) {
                    if (err) {
                        return void callback(err);
                    }

                    // Send email after saving to avoid possibility of spam
                    return void email.sendDeadlineEmail(user.name.first, config, callback);
                });
            } else {
                // User has less than 24 hours left, already warned
                return void callback();
            }
        }
    }
};