let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let item = require('item.js');

let stockSchema = new Schema({
    item_details: item,
    total_quantity: Number,
    remaining_quantity: Number // is this neccesary? even for tzadik items?
});

let Item = mongoose.model("Stock", stockSchema);

module.exports = Item;
