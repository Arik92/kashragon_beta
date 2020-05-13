let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let logSchema = new Schema({
    date: Date,    
    logType: { 
        type: String,
        enum : ['deposit', 'withdraw'], 
        default: 'deposit' 
    },
    from: String, // could possibly be a soldier id ref
    to: String
    // {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Product_Raw_Image'
    // }
});

let Log = mongoose.model("Item", logSchema);

module.exports = Log;
