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
    router.put("/update", meds.update);

    // Delete a med with id
    router.delete("/:id", meds.delete);

    router.get("/", meds.seek);

    app.use('/api/meds', router);
}