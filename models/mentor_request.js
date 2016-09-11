"use strict";
var mongoose = require('mongoose');
var User = require('./user');
var en = require("./enum.js");

var mentorRequestSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    mentor: {type: mongoose.Schema.Types.ObjectId, ref: "Mentor", default: null},
    description: {type: String, required: true}, //description of problem/reason for mentorship request
    status: {type: String, enum: en.mentorrequest.status, default: "Unclaimed"},
    location: {type: String, default: "Unknown"} // Location of user who made the request. Usually a table number.
});

module.exports = mongoose.model("MentorRequest", mentorRequestSchema);