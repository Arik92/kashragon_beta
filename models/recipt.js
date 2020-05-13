let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let reciptSchema = new Schema({
    date: Date,
    to: String,
    from: String,
    items: [{
        name: String,
        tzadik: Number
        }],
    resolved: Boolean
});

let Recipt = mongoose.model("Recipt", reciptSchema);

module.exports = Recipt;
