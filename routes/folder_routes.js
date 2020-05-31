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
        * params: id of folder to modify, id of user to be added, and request id       */
    const folderId = req.params.folder_id;
    const creatorId = helper.toObjectId(req.body.creator_id);
    const memberId = helper.toObjectId(req.body.member_id); // MUST be a valid objectId string

    try {   
    const updatedFolder = await FOLDER.findOneAndUpdate({$and: [
        { creator: creatorId },
        { _id: folderId }]},
        { $push: { allowed_members: memberId }},
        { new: true, useFindAndModify: false });
    res.send(updatedFolder);
    } catch(err) {
        console.error('error adding user to folder permissions', err);
        res.send(err.errmsg);
    }
 });

router.delete('/:folder_name', async (req, res) => {
   let del_name = req.params.folder_name;
   if (!del_name) {
       res.send('folder id not found')
   }
   try {
    const deletedFolder = await FOLDER.findOneAndRemove({folder_name: del_name}, { useFindAndModify: false });
    //TODO: take care of folder's recipts
    res.send(deletedFolder);
   } catch(err) {
       console.error('error deleting folder '+ del_name +' :', err);
   }     
 });

module.exports = router;