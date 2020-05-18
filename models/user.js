let mongoose = require('mongoose');
// let plm = require('passport-local-mongoose'); // passport might be implemented later for authentication
let Schema = mongoose.Schema;

let userSchema = new Schema({
    facebook_id: { type: String, unique: true }, // personal number. there might be issues with this
    name: String,
    profileUrl: String,
    folders: [String], // folders that can be edited by this soldier(should contain folder id refs)
    // privilage: {
    //     type: String, 
    //     enum : ['hapash', 'kashrag'], 
    //     default: 'hapash' 
    // } 
});
// productSchema.plugin(plm); 

let User = mongoose.model("User", userSchema);

module.exports = User;
