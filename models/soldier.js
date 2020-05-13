let mongoose = require('mongoose');
// let plm = require('passport-local-mongoose'); // passport might be implemented later for authentication
let Schema = mongoose.Schema;

let soldierSchema = new Schema({
    id: { type: Number, unique: true }, // personal number. there might be issues with this
    name: String,
    privilage: {
        type: String, 
        enum : ['hapash', 'kashrag'], 
        default: 'hapash' 
    } 
    // password: String // might replace id if security is a concern
});
// productSchema.plugin(plm); 

let Soldier = mongoose.model("Soldier", soldierSchema);

module.exports = Soldier;
