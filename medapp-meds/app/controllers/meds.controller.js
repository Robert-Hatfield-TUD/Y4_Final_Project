const { meds } = require("../models");
const db = require("../models");
const Med = db.meds;

exports.create = async (req, res) => {

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

        console.log("test1");
        console.log(noTake);

        const addMed = new Med({medName, brandName, description, takeMethod, sideEffect, mg, activeIng, medType, tabDescrip, takenFor, treatment, noTake, userDets});
        
        console.log("test2");

        const savedMed = await addMed.save();

        console.log("test3");
        if(!savedMed) {
            console.log("test4");
            return res.status(400).json({ error: "Medication was not saved" });
        }
        else {
            console.log("Medication was saved");
            return res.status(200).json({ msg: "Added to database" });
        }
    }
    catch (err) {
        console.log("Error: " + err);
        console.log("Error on adding Medication");
        res.status(500).send();
    }
    
};

exports.findAll = (req, res) => {

    //console.log("med: " + req.query.medName + ", treat: " + req.query.treatment);

    console.log(req.query[0]);
    console.log(req.query);
    const medName = req.query.medName;
    const treatment = req.query.treatment;

    if(req.query.medName !== undefined) {
        console.log("If for med search");

        //const medName = req.query.medName;
        console.log("Buenos dias");
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

    if(req.query.treatment !== undefined) {
        console.log("if for filter search");

        //const treatment = req.query.treatment;
        console.log("Buenos dias");
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

    if(req.query.medName === undefined && req.query.treatment === undefined) {
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

exports.findOne = (req, res) => {
    Med.findById(req.params.id)
        .then((meds) => res.json(meds))
        .catch((err) => res.status(400).json("Error: " + err));
};

exports.update = (req, res) => {
    Med.findById(req.body.id)
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

exports.delete = (req, res) => {
    Med.findByIdAndDelete(req.params.id)
        .then(() => res.json("Medication has been removed"))
        .catch((err) => res.status(400).json("Error: " + err));
};

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