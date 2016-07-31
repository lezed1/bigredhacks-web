"use strict";
/**
 * Common helper functions
 */

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

module.exports = util;