"use strict";
var mongoose = require('mongoose');
var en = require("./enum.js");

var mentorRequestSchema = new mongoose.Schema({
    description: {type: String, required: true}, //description of problem/reason for mentorship request
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    mentor: {type: mongoose.Schema.Types.ObjectId, ref: "Mentor", default: null},
    status: {type: String, enum: en.mentorrequest.status, default: "Unclaimed"},
    location: {type: String, default: "Unknown"}, // Location of user who made the request. Usually a table number.
    createdAt: {type: Date, default: Date.now()}
});

mentorRequestSchema.statics.generateRequest = function(userId, descrip, loc, callback) {
    var request = new this({
        user: userId,
        description: descrip,
        location: loc
    });

    request.save(callback);
};

module.exports = mongoose.model("MentorRequest", mentorRequestSchema);