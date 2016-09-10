"use strict";
/**
 * Tracks a checkout of hardware until it is checked back in
 */

var mongoose = require('mongoose');

var hardwareItemCheckoutSchema = new mongoose.Schema({
    student_id: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    inventory_id: {type: mongoose.Schema.Types.ObjectId, ref: "HardwareItem", required: true},
    quantity: {type: Number, required: true}
});

// Hooks
hardwareItemCheckoutSchema.pre('save', function(next) {
    if (this.quantity < 0) {
        return next(new Error('Negative transaction quantity!'));
    }

    return next();
});

module.exports = mongoose.model("HardwareItemCheckout", hardwareItemCheckoutSchema);