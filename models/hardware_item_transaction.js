"use strict";
/**
 * A log entry of a hardware transaction. Objects should not be deleted as it is meant to recover from
 * any errors in the HardwareItemCheckout schema
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
hardwareItemTransactionSchema.statics.make = function transaction(itemName, studentId, quantity, checkOut, callback) {
    let txn = new this({
        itemName,
        studentId,
        quantity,
        checkOut
    });

    txn.save(callback);
};

module.exports = mongoose.model("HardwareItemTransaction", hardwareItemTransactionSchema);