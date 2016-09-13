"use strict";
/**
 * A secret key to enable mentor registration for one user
 */

var mongoose = require('mongoose');

var mentorAuthorizationKeySchema = new mongoose.Schema({
    key: {type: String, required: true}
});

module.exports = mongoose.model("MentorAuthorizationKey", mentorAuthorizationKeySchema);