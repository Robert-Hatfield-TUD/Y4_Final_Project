/*

This file sets the MongoDB promise up as well as setting the url to be used.
 
Author: Robert Hatfield (C18475892)
Date: 12/03/2022
Compiler: Visual studio code
 
*/

const dbConfig = require("../config/db.config.js");
const mongoose = require("mongoose");
const db = {};

mongoose.Promise = global.Promise;

db.mongoose = mongoose;
db.url = dbConfig.url;
db.meds = require("./meds.models.js")(mongoose);

module.exports = db;