let express = require('express');
let router = express.Router;

let TZELEM = require('../models/tzelem');

router.post('deposit', (req, res) => {
    // execute recipt after it was signed to transfer tzelem ownership
    let tzelems = req.body.tzelems; // array of tzelem id's
    let owner = req.body.owner;
    TZELEM.update({ id: { $in: tzelems }}, { currently_assigned: owner }, { multi: true },(req, res) => {
        // TODO: send a log to log
        res.send('done');
        // next();
    })
    // , (req, res) => {
    //     // let items = req.body.items;
    //     // this wont do, unlike tzelem items have quantities. how would that work?
    //     res.send('done!');
    // })    
 });

router.put('withdraw', (req, res) => {
    // execute recipt after it was signed to transfer tzelem ownership
    let tzelems = req.body.tzelems; // array of tzelem id's
    let owner = req.body.owner;
    TZELEM.update({ id: { $in: tzelems }}, { currently_assigned: owner }, { multi: true },(req, res) => {
        // TODO: send a log to log
        res.send('done');
        // next();
    })
    // , (req, res) => {
    //     // let items = req.body.items;
    //     // this wont do, unlike tzelem items have quantities. how would that work?
    //     res.send('done!');
    // })    
 });

module.exports = router;