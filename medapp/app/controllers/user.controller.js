const db = require("../models");
const User = db.user;
const bcrypt = require("bcrypt");
const { user } = require("../models");
const passport = require("passport");
const passStrat = require("passport-local");
const jwt = require("jsonwebtoken");



//Creating a new user
exports.create = async (req, res) => {
    try {
        //Validation
        if(!req.body.username || !req.body.email || !req.body.password || !req.body.age) {
            res
                .status(400)
                .send({ message: "Please fill all fields Email, Username, Password and Age"});
            return;
        }

        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const age = req.body.age;

        console.log("Details: " + username, email, password, age);

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

        console.log("Salt: " + salt + " HPass: " + hashedPassword);

        // Adding user
        const addUser = new User({ username, email, hashedPassword, age });

        const saveUser = await addUser.save();
        if (!saveUser) {
            return res.status(400).json({ error: "User was not saved" });
        }
        else {
            console.log("User was saved");
            return res.status(200).json({ msg: "Added to database" });
        }

    }

    catch (err) {
        console.log("Error: " + err);
        console.log("Error on registration");
        res.status(500).send();
    }
};

//Get all users from database
exports.findAll = (req, res) => {
    User.find()
        .then((user) => res.json(user))
        .catch((err) => res.status(400).json("Error: " + err));
};


//Find user with id
exports.findOne = (req, res) => {
    User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
};

//Update a user
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

//Delete a user
exports.delete = (req, res) => {
    User.findByIdAndDelete(req.params.id)
    .then(() => res.json("User has been removed"))
    .catch((err) => res.status(400).json("Error: " + err));
};

// Allowing user to login
exports.login = async (req, res) => {
    try {

        var userlog = "";

        // Validation
        if (!req.body.email || !req.body.password) {
            res.status(400).send({ msg: "Please fill both fields for email and password" });
            return;
        }

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

        if(hasAccount && checkPassword) {
            console.log(email);
            userlog = email;
            console.log("User has been logged in data to be checked.");
            return res.status(200).json(userlog);
        }

    }
    catch (err) {
        console.log("Error: " + err);
        res.status(500).send();
    }
}

exports.logout = (req, res) => {
    res
        .cookie("token", "", {
            sameSite: "none",
            secure: true,
            httpOnly: true,
            expires: new Date(0),
        })
        .send();
}

exports.loggedIn = (req, res) => {
    // Check for user logged in
    try {
        const token = req.cookies.token;
        if (!token) return res.json(false);

        jwt.verify(token, process.env.JWT);

        res.send(true);
    }
    catch (err) {
        res.json(false);
    }
}