"use strict";
var mongoose = require('mongoose');
var cache = null;

var schemaOptions = {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
};

var hardwareSchema = new mongoose.Schema({
    name: {type: String, required: true, index: true},
    quantityAvailable: {type: Number, default: 0, required: true},
    quantityOwned: {type: Number, default: 0, required: true},
}, schemaOptions);

/**
 * add a single college entry
 * @param name
 * @param quantityAvailable
 * @param quantityOwned
 * @param callback
 */
hardwareSchema.statics.add = function (name, quantityAvailable, quantityOwned, callback) {
    quantityAvailable = typeof quantityAvailable !== 'undefined' ?  quantityAvailable : 0;
    quantityOwned = typeof quantityOwned !== 'undefined' ?  quantityOwned : 0;

    var hardware = new this({
        name: name,
        quantityAvailable: quantityAvailable,
        quantityOwned: quantityOwned,
    });

    this.findOne({name: name}, function (err, res) {
        if (res === null) {
            //entry does not exist
            hardware.save(function (err) {
                callback(err, hardware);
            });
        }
    });
};

/**
 * get all Hardware entries, limiting by fields
 * @param callback
 * @todo limit field selection
 */
hardwareSchema.statics.getAll = function (callback) {
        if (cache == null) {
            this.find({}, function (err, res) {
                if (err) {
                    callback(err);
                }
                res = res.map(function (x) {
                    return {
                        name: x.name
                    }
                });
                cache = res;
                callback(null, res);
            });
        }
    else callback(null, cache);
};


module.exports = mongoose.model("Hardware", hardwareSchema);