"use strict";
/**
 * Common helper functions
 */

var async = require('async');
var icalendar = require('icalendar');
var request = require('request');
var config = require('../config');

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

// 3 minute cache
const CACHE_EXPIRATION_IN_MILLIS = 1000 * 60 * 3;
// Last grabbed calendar
var cachedCalendar = null;
// Date of when calendar was last updated
var lastCalendarUpdate = null;
/**
 * Returns a sorted calendar (see APIdoc in api.js). Uses a simple cache
 * to reduce load on ical source.
 */
util.grabCalendar = function grabCalendar(callback) {
    if (!lastCalendarUpdate || lastCalendarUpdate < Date.now() - CACHE_EXPIRATION_IN_MILLIS) {
        // This serves as a lock so that we do not repeat requests. While this occurs, stale calendar data will
        // be fed temporarily to subsequent requests.
        lastCalendarUpdate = Date.now();
        request(config.setup.ical, function(err, response, ical) {
            if (err) {
                callback(err);
            } else if (response.statusCode != 200) {
                callback('ERROR: Bad response on calendar request!');
            } else {
                var calendar = icalendar.parse_calendar(ical);

                let calendarEvents = calendar.events().map(element => {
                    return {
                        event: element.properties.SUMMARY[0].value,
                        start: element.properties.DTSTART[0].value,
                        end: element.properties.DTEND[0].value,
                        location: element.properties.LOCATION[0].value,
                        description: element.properties.DESCRIPTION[0].value
                    }
                }).sort( (x,y) => (x.start > y.start));

                // Update cache
                cachedCalendar = calendarEvents;
                callback(null, calendarEvents);
            }
        });
    } else {
        callback(null, cachedCalendar);
    }
};

module.exports = util;