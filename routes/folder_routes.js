let express = require('express');
let router = express.Router;

let FOLDER = require('../models/folder');

router.post('new_folder', (req, res) => {
    // execute recipt after it was signed to transfer folder ownership
    let new_folder = new FOLDER(req.body); // array of folder id's
    new_folder.save((req, res) => {
        // TODO: send a log to log
        res.send('done');
        // next();
    })
    // , (req, res) => {
    //     // let items = req.body.items;
    //     // this wont do, unlike folder items have quantities. how would that work?
    //     res.send('done!');
    // })    
 });

router.delete('del_folder', (req, res) => {
   let del_id = rqe.body.id;
   if (!del_id) {
       res.send('folder id not found')
   }
    FOLDER.findByIdAndRemove(del_id, (req, res) => {
        // TODO: send a log to log
        res.send('done');
        // next();
    })
    // , (req, res) => {
    //     // let items = req.body.items;
    //     // this wont do, unlike folder items have quantities. how would that work?
    //     res.send('done!');
    // })    
 });

module.exports = router;