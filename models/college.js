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

var collegeSchema = new mongoose.Schema({
    _id: {type: String, required: true, unique: true}, //unique college id
    name: {type: String, required: true, index: true},
    city: {type: String},
    state: {type: String}, //2 letter
    zip: String,
    loc: {
        type: {type: String},
        coordinates: [Number] //offic. convention is lon, lat
    },
    _distance: Number //internal param for use in geonear
}, schemaOptions);
collegeSchema.index({loc: '2dsphere'});

//display name of college
collegeSchema.virtual('display').get(function () {
    return this.name + " - " + this.state;
});

/**
 * add a single college entry
 * @param unitid
 * @param name
 * @param city
 * @param state
 * @param zip
 * @param lon
 * @param lat
 * @param callback
 */
collegeSchema.statics.add = function (unitid, name, city, state, zip, lon, lat, callback) {
    var college = new this({
        _id: unitid,
        name: name,
        city: city,
        state: state,
        zip: zip,
        loc: {
            type: "Point",
            coordinates: [parseFloat(lon), parseFloat(lat)]
        }
    });

    this.findOne({_id: unitid}, function (err, res) {
        if (res === null) {
            //entry does not exist
            college.save(function (err) {
                callback(err, college);
            });
        }
    });
};

/**
 * get all College entries, limiting by fields
 * @param callback
 * @todo limit field selection
 */
collegeSchema.statics.getAll = function (callback) {
        if (cache == null) {
            this.find({}, function (err, res) {
                if (err) {
                    callback(err);
                }
                res = res.map(function (x) {
                    return {
                        id: x._id,
                        name: x.display
                    }
                });
                cache = res;
                callback(null, res);
            });
        }
    else callback(null, cache);
};

collegeSchema.statics.exists = function (unitid, callback) {
    this.findOne({_id: unitid}, function (err, res) {
        if (err) callback(err);
        if (res === null) {
            //entry does not exist
            callback(null, false);
        }
        return callback(null, true);
    })
};

module.exports = mongoose.model("College", collegeSchema);