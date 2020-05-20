let express = require('express');
let router = express.Router;

let FOLDER = require('../models/folder');

router.post('/new_folder', (req, res) => {
    let new_folder = new FOLDER({}); // array of folder id's
    // new_folder.creator = ObjectId(req.body.creator_id);
    new_folder.save((req, res) => {
        // TODO: send a log to log
        res.send('done');
        // next();
    })    
 });

 router.get('/folders/:id', (req, res) => { //NEEDS TESTING
     // get all folders that the user with id param has access to
     const userId = req.params.id;
     FOLDER.find({ allowed_members: userId }, (err, folders) => {
         if (err) {
             console.error('error fetching folders for that id');
         } else {
             res.send(folders);
         }
     });
 });

router.delete('/del_folder', (req, res) => {
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