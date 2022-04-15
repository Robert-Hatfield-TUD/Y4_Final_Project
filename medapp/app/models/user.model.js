/*

This file is setting the schema/model to be used in the database for the user.
The method at the bottom is used to change the id so that it can be more easily accessed
in the front-end.

Author: Robert Hatfield (C18475892)
Date: 12/03/2022
Compiler: Visual studio code

*/

const { mongoose } = require(".");

// Creating the model for the user
module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            username: String,
            email: String,
            hashedPassword: String,
            age: Number
        },
        { timestamps: true }
    );
    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    const User = mongoose.model("user", schema);
    return User;
};