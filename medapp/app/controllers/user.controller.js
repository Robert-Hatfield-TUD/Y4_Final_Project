/*

This file has the exports for the database requests which handle the requests to the database.
The user requests include funcitons such as creating a new user and verifying a users details.

Author: Robert Hatfield (C18475892)
Date: 12/03/2022
Compiler: Visual studio code

*/

// Requires for the requests and encryption
const db = require("../models");
const User = db.user;
const bcrypt = require("bcrypt");
const { user } = require("../models");

//Creating a new user
exports.create = async (req, res) => {
    try {
        //Validation that all details have a value
        if(!req.body.username || !req.body.email || !req.body.password || !req.body.age) {
            res
                .status(400)
                .send({ message: "Please fill all fields Email, Username, Password and Age"});
            return;
        }

        // Storing values for later use
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const age = req.body.age;

        // Test logging that details have been assigned correctly
        //console.log("Details: " + username, email, password, age);

        // Checking that username is not in use
        const notUniqueUsername = await User.findOne({ username: username });
        if (notUniqueUsername) {
            return res.status(400).json({ error: "This username is already in use" });
        }

        // Checking that email is not in use
        const notUniqueEmail = await User.findOne({ email: email });
        if (notUniqueEmail) {
            return res.status(400).json({ error: "This email is already in use" });
        }

        // Hashing the entered password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        // Test logging for the encryption of the password
        //console.log("Salt: " + salt + " HPass: " + hashedPassword);

        // Adding user
        const addUser = new User({ username, email, hashedPassword, age });

        // Saving user to database
        const saveUser = await addUser.save();
        if (!saveUser) {
            return res.status(400).json({ error: "User was not saved" });
        }
        else {
            console.log("User was saved");
            return res.status(200).json({ msg: "Added to database" });
        }

    }
    // Catch for error
    catch (err) {
        console.log("Error: " + err);
        console.log("Error on registration");
        res.status(500).send();
    }
};

//Get all users from database
exports.findAll = (req, res) => {

    // Storing the value in variable
    const email = req.query.email;

    if(req.query.email !== undefined) {

        // Test logging for valid value
        //console.log(req.query.email);

        // condition to find user by provided email 
        var cond = email ? { email: { $regex: new RegExp(email), $options: "i" } } : {};

        // Finding user by condition
        User.find(cond)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occured while retrieving user"
                });
            });
    }

    // If which returns all users 
    if(req.query.email === undefined) {

        User.find()
        .then((user) => res.json(user))
        .catch((err) => res.status(400).json("Error: " + err));
    }

};


//Find user with id
exports.findOne = (req, res) => {
    User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
};

//Update a user ny their id
exports.update = (req, res) => {
    User.findById(req.params.id)
    .then((user) => {
        user.username = req.body.username;
        user.email = req.body.email;
        user.password = req.body.password;
        user.age = req.body.password;

        user
            .save()
            .then(() => res.json("User details updated"))
            .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

//Delete a user by their id
exports.delete = (req, res) => {
    User.findByIdAndDelete(req.params.id)
    .then(() => res.json("User has been removed"))
    .catch((err) => res.status(400).json("Error: " + err));
};

// Allowing user to login
exports.login = async (req, res) => {
    try {

        var userlog = "";

        // Validation to make sure values are not empty
        if (!req.body.email || !req.body.password) {
            res.status(400).send({ msg: "Please fill both fields for email and password" });
            return;
        }

        // Storing values
        const email = req.body.email;
        const password = req.body.password;

        // Check user has account
        const hasAccount = await User.findOne({ email: email });
        if (!hasAccount) {
            res.status(401).send({ msg: "Incorrect details entered" });
            return;
        }

        // Check users password
        const checkPassword = await bcrypt.compare(password, hasAccount.hashedPassword);
        if (!checkPassword) {
            res.status(401).send({ msg: "Incorrect details entered" });
            return;
        }

        // If user details match return with success
        if(hasAccount && checkPassword) {
            console.log(email);
            userlog = email;
            console.log("User has been logged in data to be checked.");
            return res.status(200).json(userlog);
        }

    }
    // Catch for login error
    catch (err) {
        console.log("Error: " + err);
        res.status(500).send();
    }
}