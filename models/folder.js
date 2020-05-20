let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let folderSchema = new Schema({
    name: String,
    training_units: [string],
    creator: { type: Schema.Types.ObjectId, ref:"User", $db : "users" },  // user ref of id.
    allowed_members: [{ type: Schema.Types.ObjectId, ref:"User", $db : "users" }],
    unit_frames: [{
        name: String,
        recipts: [{ type: Schema.Types.ObjectId, ref:"Recipt", $db : "recipts" }],        
    }]
    // reports: [] // future features. might consider relocating this
});

let Item = mongoose.model("Folder", folderSchema);

module.exports = Item;
// as the app expands, it might be neccesary to differentiate צ and non צ items
