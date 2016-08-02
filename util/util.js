"use strict";
/**
 * Common helper functions
 */

var async = require('async');

var util = {};

// Callback for most saves
util.dbSaveCallback = function (res) {
    return (function(err) {
        if (err) {
            console.error(err);
            return res.sendStatus(500);
        }

        return res.sendStatus(200);
    });
};

/**
 * Removes user from its current bus, factored out for reuse
 * @param user
 */
util.removeUserFromBus = function (Bus, req, res,user) {
    Bus.findOne({_id: req.body.busid}, function (err, bus) {
        if (user.internal.busid == req.body.busid) {
            user.internal.busid = null;
            var newmembers = [];
            // Remake user list without the user being removed included
            async.each(bus.members, function (member, callback) {
                if (member.id != user.id) {
                    newmembers.push(member);
                }

                callback();
            }, function (err) {
                bus.members = newmembers;
                bus.save(function (err) {
                    if (err) {
                        console.error(err);
                        return res.sendStatus(500);
                    } else {
                        user.save(function (err) {
                            if (err) {
                                console.error(err);
                                return res.sendStatus(500);
                            } else {
                                return res.sendStatus(200);
                            }
                        });
                    }
                })
            });
        } else {
            user.internal.busid = null;
            user.save(function (err) {
                if (err) {
                    return res.sendStatus(500);
                }
                else {
                    return res.sendStatus(200);
                }
            });
        }
    });
};

module.exports = util;