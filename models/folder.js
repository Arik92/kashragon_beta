let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let folderSchema = new Schema({
    name: String,
    training_units: [string]
    // recipts: [] TODO
});

let Item = mongoose.model("Folder", folderSchema);

module.exports = Item;
// as the app expands, it might be neccesary to differentiate צ and non צ items
