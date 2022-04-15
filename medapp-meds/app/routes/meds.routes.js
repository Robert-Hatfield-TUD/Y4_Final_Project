/*

This file includes the routes for the requests on the back-end

Author: Robert Hatfield (C18475892)
Date: 12/03/2022
Compiler: Visual studio code

*/

module.exports = app => {
    const meds = require("../controllers/meds.controller.js");
    var router = require("express").Router();

    // Create a new medication
    router.post("/create", meds.create);

    // Retrieve all meds
    router.get("/", meds.findAll);

    // Retrieve a single med with id
    router.get("/:id", meds.findOne);

    // Update a med with id
    router.put("/update/:id", meds.update);

    // Delete a med with id
    router.delete("/:id", meds.delete);

    // Retrieve a medication by name
    router.get("/", meds.seek);

    // Set baseline url
    app.use('/api/meds', router);
}