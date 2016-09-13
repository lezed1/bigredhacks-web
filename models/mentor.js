"use strict";
var mongoose = require('mongoose');

var mentorSchema = new mongoose.Schema({
    name: {
        first: {type: String, required: true},
        last: {type: String, required: true}
    },
    company: {type: String, required: true}, // May also just be an organization
    email: {type: String, required: true, lowercase: true, trim: true, index: {unique: true}},
    secretId: {type: String, required: true}
});

module.exports = mongoose.model("Mentor", mentorSchema);