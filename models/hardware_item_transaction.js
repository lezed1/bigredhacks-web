"use strict";
/**
 * Holds inventory information for a hardware item
 */

var mongoose = require('mongoose');

var hardwareItemTransactionSchema = new mongoose.Schema({
    itemName: {type: String, required: true, index: true}, // Not a reference in case we delete the item from db
    studentId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    quantity: {type: Number, required: true},
    checkOut: {type: Boolean, required: true},
    timestamp: {type: Date, default: Date.now}
});

// Methods
hardwareItemTransactionSchema.statics.make = function transaction(itemName, student_id, quantity, checkOut, callback) {
    let txn = new this({
        itemName,
        student_id,
        quantity,
        checkOut
    });

    txn.save(callback);
};

module.exports = mongoose.model("HardwareItemTransaction", hardwareItemTransactionSchema);