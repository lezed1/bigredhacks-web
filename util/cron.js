// Regular decision deadline processing
var CronJob = require('cron').CronJob;

var config = require('../config.js');
var email = require('./email');

var User = require('../models/user.js');

const TIME_ZONE = 'America/New_York';
const EVERY_EIGHT_HOURS = '*/8 * * * *';
const DAY_IN_MILLIS = 1000 * 60 * 60 * 24;
const DATE_FOR_WARNING = new Date(Date.now() - DAY_IN_MILLIS * (Number(config.admin.days_to_rsvp) - 1)); // One day in advance
const DATE_FOR_REJECTION = new Date(Date.now() - DAY_IN_MILLIS * (Number(config.admin.days_to_rsvp)));

new CronJob(EVERY_EIGHT_HOURS, function checkDecisionDeadlines() {


    User.find( { $and: [
        {"internal.status" : "Accepted"},
        {"internal.notificationStatus" : "Accepted"},
        {"internal.going" : null},
        {"internal.lastNotifiedAt" : {$lt: DATE_FOR_WARNING}}
    ]}, function(err,users) {
        if (err) {
            return void console.error(err);
        }

        users.every(x => _warnOrRejectUser(x));
    });
}, null, true, TIME_ZONE);

// Warns or rejects a user if they are past deadline
function _warnOrRejectUser(user) {
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
        email.sendDecisionEmail(user.name.first, user.internal.notificationStatus, user.internal.status, config, function(err) {
            if (err)  {
                return void console.error(err);
            } else {
                user.internal.lastNotifiedAt = Date.now();
                user.internal.notificationStatus = 'Rejected';
                user.save(function(err) {
                    if (err) {
                        console.error(err);
                        console.error("ERROR: User with email " + user.email + " has been informed of their new status, but that was not saved in the database!");
                    }
                });
            }
        });
    } else {
        if (!user.internal.deadlineWarned) {
            // Warn
            user.internal.deadlineWarned = true;
            user.save(function (err) {
                if (err) {
                    console.error(err);
                    return false;
                }
                // Send email after saving to avoid possibility of spam
                email.sendDeadlineEmail(user.name.first, config, function(err) {
                    if (err) {
                        console.error(err);
                    }
                });
            });
        }
    }

    return true; // Execution was successful
}