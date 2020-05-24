let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let folderSchema = new Schema({
    folder_name: {type: String, unique: true},
    creator: { type: Schema.Types.ObjectId, ref:"User", $db : "users" },  // user ref of id.
    allowed_members: [{ type: Schema.Types.ObjectId, ref:"User", $db : "users" }],
    training_units: [{
        unit_name: String,
        recipts: [{ type: Schema.Types.ObjectId, ref:"Recipt", $db : "recipts" }],        
    }]
    // reports: [] // future features. might consider relocating this
});

let Item = mongoose.model("Folder", folderSchema);

module.exports = Item;