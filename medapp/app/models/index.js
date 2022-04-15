/*

This file sets the MongoDB promise up as well as setting the url to be used.
 
Author: Robert Hatfield (C18475892)
Date: 12/03/2022
Compiler: Visual studio code
 
*/

const dbConfig = require("../config/db.config.js");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.url = dbConfig.url;
db.user = require("./user.model.js")(mongoose);

module.exports = db;