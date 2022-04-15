/*

This file is the main server file which is ran to start the server.

Author: Robert Hatfield (C18475892)
Date: 12/03/2022
Compiler: Visual studio code

*/

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

// Setting CORS up to allow for the listed requests to work
var corsOptions = {
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE"],
    credentials: true,
};

app.use(cors(corsOptions));

// Setting Body-parser up to parse requests more easily
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Getting the root page and displaying "working" if it is successful
app.get("/", (req, res) => {
    res.json({ message: "Working" });
});

// Setting the port value to be 8080
const PORT = process.env.PORT || 8080;

// Requiring routes so they can be used
require("./app/routes/user.routes.js")(app);

// Set server to listen on the port
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}.`);
});

// Connection for the MongoDB
const db = require("./app/models");
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connection to database: Passed");
    })
    .catch(err => {
        console.log("Connection to database: Failed, ", err);
        process.exit();
    });