/*

This file is the controller which handles the requests from the front-end and returns values
to be displayed.

Author: Robert Hatfield (C18475892)
Date: 12/03/2022
Compiler: Visual studio code

*/

const { meds } = require("../models");
const db = require("../models");
const Med = db.meds;

// Creating a medication
exports.create = async (req, res) => {
    // Setting medication values
    try {
        const medName = req.body.medName;
        const brandName = req.body.brandName;
        const description = req.body.description;
        const takeMethod = req.body.takeMethod;
        const sideEffect = req.body.sideEffect;
        const mg = req.body.mg;
        const activeIng = req.body.activeIng;
        const medType = req.body.medType;
        const tabDescrip = req.body.tabDescrip;
        const takenFor = req.body.takenFor;
        const treatment = req.body.treatment;
        const noTake = req.body.noTake;
        const userDets = req.body.userDets;

        const addMed = new Med({medName, brandName, description, takeMethod, sideEffect, mg, activeIng, medType, tabDescrip, takenFor, treatment, noTake, userDets});

        // Saving medication
        const savedMed = await addMed.save();

        // If for saving the medication
        if(!savedMed) {
            return res.status(400).json({ error: "Medication was not saved" });
        }
        else {
            console.log("Medication was saved");
            return res.status(200).json({ msg: "Added to database" });
        }
    }
    // Catch for the medication errors
    catch (err) {
        console.log("Error: " + err);
        console.log("Error on adding Medication");
        res.status(500).send();
    }
    
};

// Finding the medications 
exports.findAll = (req, res) => {

    const medName = req.query.medName;
    const treatment = req.query.treatment;
    const userDets = req.query.userDets;

    // If which is done if there is a medName in the request
    if(req.query.medName !== undefined) {
        
        // Condition used to find medications containing the requested value
        var cond = medName ? { medName: { $regex: new RegExp(medName), $options: "i" } } : {};

        Med.find(cond)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occured while retrieving medications"
                });
            });
    }

    // If which is done if there is a treatment in the request
    if(req.query.treatment !== undefined) {
    
        // Condition used to find medications containing the requested value
        var cond = treatment ? { treatment: { $regex: new RegExp(treatment), $options: "i" } } : {};
        Med.find(cond)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occured while retrieving medications"
                });
            });
    }

    // If which is done if there is a userDets in the request
    if(req.query.userDets !== undefined) {

        // Find to return the medications the user is prescribed to
        Med.find({ userDets: req.query.userDets })
            .then((response) => {
                res.send(response);
            })
            .catch((err) => {
                res.status(500).send({
                    message:
                        err.message || "Some error occured while retrieving medications"
                });
            })
    }

    // If to return all medications if all values are empty
    if(req.query.medName === undefined && req.query.treatment === undefined && req.query.userDets === undefined) {
        Med.find()
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occured while retrieving medications"
                });
            });
    }
};

// Finding medication by id
exports.findOne = (req, res) => {
    Med.findById(req.params.id)
        .then((meds) => res.json(meds))
        .catch((err) => res.status(400).json("Error: " + err));
};

// Updating a medication
exports.update = (req, res) => {

    Med.findById(req.params.id)
        .then((meds) => {
        meds.medName = req.body.medName;
        meds.brandName = req.body.brandName;
        meds.description = req.body.description;
        meds.takeMethod = req.body.takeMethod;
        meds.sideEffect = req.body.sideEffect;
        meds.mg = req.body.mg;
        meds.activeIng = req.body.activeIng;
        meds.medType = req.body.medType;
        meds.tabDescrip = req.body.tabDescrip;
        meds.takenFor = req.body.takenFor;
        meds.treatment = req.body.treatment;
        meds.noTake = req.body.noTake;
        meds.userDets = req.body.userDets;

        meds
            .save()
            .then(() => res.json("Medication details updated"))
            .catch((err) => res.status(400).json("Error: " + err));

        })
        .catch((err) => res.status(400).json("Error: " + err));
};

// Deleting medication by id
exports.delete = (req, res) => {
    Med.findByIdAndDelete(req.params.id)
        .then(() => res.json("Medication has been removed"))
        .catch((err) => res.status(400).json("Error: " + err));
};

// Searching for medication by medication name
exports.seek = (req, res) => {
    const medName = req.query.medName;
    console.log(req.query.medName);

    var cond = medName ? { medName: { $regex: new RegExp(medName), $options: "i" } } : {};
    Med.find(cond)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving medications"
            });
        });
};