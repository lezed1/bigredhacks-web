"use strict";

/**
 * Holds inventory information for a hardware item
 */

var mongoose = require('mongoose');

var inventorySchema = new mongoose.Schema({
    name: {type: String, required: true, index: true},
    quantityAvailable: {type: Number, default: 0, required: true},
    quantityOwned: {type: Number, default: 0, required: true}
});

module.exports = mongoose.model("Inventory", inventorySchema);