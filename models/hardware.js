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
    _id: {type: String, required: true, unique: true}, //unique college id
    name: {type: String, required: true, index: true},
    quantityAvailable: {type: Number, required: true},
    quantityOwned: {type: Number, required: true},
}, schemaOptions);

/**
 * add a single college entry
 * @param name
 * @param quantityAvailable
 * @param quantityOwned
 * @param callback
 */
hardwareSchema.statics.add = function (id ,name, quantityAvailable, quantityOwned, callback) {
    var hardware = new this({
        _id: id,
        name: name,
        quantityAvailable: quantityAvailable,
        quantityOwned: quantityOwned,
    });

    // TODO: Populate
    // this.findOne({_id: id}, function (err, res) {
    //     if (res === null) {
    //         //entry does not exist
    //         hardware.save(function (err) {
    //             callback(err, hardware);
    //         });
    //     }
    // });
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
                        name: x.display
                    }
                });
                cache = res;
                callback(null, res);
            });
        }
    else callback(null, cache);
};


module.exports = mongoose.model("Hardware", hardwareSchema);