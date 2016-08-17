"use strict";
/**
 * Tracks a checkout of hardware until it is checked back in
 */

var mongoose = require('mongoose');

var inventoryTransactionSchema = new mongoose.Schema({
    student: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    inventory_id: {type: mongoose.Schema.Types.ObjectId, ref: "Inventory", required: true},
    quantity: {type: Number, required: true}
});

module.exports = mongoose.model("InventoryTransaction", inventoryTransactionSchema);