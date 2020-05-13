let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let tzelem_schema = new Schema({
    id: { type: Number, unique: true },
    currently_assigned: String
});

let itemSchema = new Schema({
    name: String,
    tzelem_ids: [tzelem_schema]
    // total_quantity: Number,
    // remaining_quantity: Number // is this neccesary? even for tzadik items?
});

let Item = mongoose.model("Item", itemSchema);

module.exports = Item;
// as the app expands, it might be neccesary to differentiate צ and non צ items
