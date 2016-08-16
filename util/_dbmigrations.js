"use strict";

var async = require("async");
var User = require("../models/user");
var migration = {};

/**
 * Back fill missing internal.daysToRSVP
 * @year 2016
 * @Deprecated
 */
migration.backFillRSVPTime = function() {
    User.find( {'internal.daysToRSVP': {$exists: false}}).exec(function (err, users) {
        const RATE_LIMIT = 3;
        async.eachLimit(users, RATE_LIMIT, function(user,done) {
            console.log('Migrating user: ' + user.name.full);
            user.internal.daysToRSVP = 10; // Since this is run once, just using 10
            user.save(done);
        }, function(err) {
            if (err) {
                console.error(err);
            }
            else {
                console.log("Migration completed.")
            }
        })
    })
};

/**
 * Back fill missing internal.status for users who applied before the default status was set to pending.
 * @year 2015
 * @deprecated
 */
migration.backFillStatus = function() {
    User.find( {'internal.status': {$exists: false}}).exec(function (err, users) {
        async.each(users, function(user,done) {
            console.log(user.internal.status);
            user.internal.status = "Pending";
            user.save(done);
        }, function(err) {
            if (err) {
                console.error(err);
            }
            else {
                console.log("Migration completed.")
            }
        })
    })
};

module.exports = migration;