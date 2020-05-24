const express = require('express');
const router = express.Router();
const FOLDER = require('../models/folder');
const helper = require('./helper');


router.post('/:id', async (req, res) => {
    let new_folder = new FOLDER({});
    const creator_id = helper.toObjectId(req.params.id);
    new_folder.creator = creator_id;
    new_folder.allowed_members.push(creator_id);
    new_folder.folder_name = req.body.folder_name;
    req.body.units.map(unit => {
        new_folder.training_units.push({
            unit_name: unit,
            recipts: []
        });
    });
    try {
        const response_folder = await new_folder.save();
        res.send(response_folder);
    } catch (err) {
        res.send(err.errmsg);
    }
 });

 router.get('/:id', async (req, res) => { 
     // get all folders that the user with id param has access to
     const userId = req.params.id;
     try {
        const folders = await FOLDER.find({ allowed_members: userId });
        res.send(folders);
     } catch(err) {
        console.error('error fetching folders for that id');
        res.send(err.errmsg);
     };     
 });

 router.put('/add_member/:folder_id', async (req, res) => { 
       /** Add a member to allowed_members of folder, if creator id matches request id
        * params: id of folder to modify, id of user to be added, and request id
       */
    const folderId = req.params.folder_id;
    const requestId = req.body.request_id;
    const memberId = req.body.member_id;
    try {   
    const updatedFolder = await FOLDER.findOneAndUpdate({$and: [
        { creator: requestId },
        { _id: folderId }]},
        { $push: { allowed_members: memberId }},
        { new: true });
    res.send(updatedFolder);
    } catch(err) {
        console.error('error adding user to folder permissions');
        res.send(err.errmsg);
    }
 });

// router.delete('/del_folder', (req, res) => {
//    let del_id = rqe.body.id;
//    if (!del_id) {
//        res.send('folder id not found')
//    }
//     FOLDER.findByIdAndRemove(del_id, (req, res) => {
//         // TODO: send a log to log
//         res.send('done');
//         // next();
//     })
//     // , (req, res) => {
//     //     // let items = req.body.items;
//     //     // this wont do, unlike folder items have quantities. how would that work?
//     //     res.send('done!');
//     // })    
//  });

module.exports = router;