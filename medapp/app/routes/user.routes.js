module.exports = app => {
    const user = require("../controllers/user.controller.js");
    var router = require("express").Router();

    // Create a new User
    router.post("/create", user.create);

    // Retrieve all user
    router.get("/", user.findAll);

    // Retrieve a single User with id
    router.get("/:id", user.findOne);

    // Update a User with id
    router.put("/update", user.update);

    // Delete a User with id
    router.delete("/:id", user.delete);

    router.post("/login", user.login);

    app.use('/api/user', router);

  };