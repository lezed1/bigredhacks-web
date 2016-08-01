"use strict";
var mongoose = require('mongoose');
var College = require('./college');
var User = require('./user');

var busSchema = new mongoose.Schema({
    name: {type: String, required: true, index: true}, //bus route name
    confirmed: {type: Boolean, default: false}, // True if the route is no longer tentative and will have a bus
    stops: [{
        collegeid: {type: String, ref: "College", index: true},
        collegename: String
    }],
    capacity: {type: Number},
    members: [{
        name: String,
        college: String,
        email: String,
        id: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}
    }],
    captain: {
        name: String,
        email: String,
        college: String,
        id: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
    }
});


module.exports = mongoose.model("Bus", busSchema);