/*

This file is setting the schema/model to be used in the database for the medication.
The method at the bottom is used to change the id so that it can be more easily accessed
in the front-end.

Author: Robert Hatfield (C18475892)
Date: 12/03/2022
Compiler: Visual studio code

*/

const { mongoose } = require(".");

// Creating the model for the medication
module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            medName: String,
            brandName: String,
            description: String,
            takeMethod: String,
            sideEffect: Array,
            mg: Number,
            activeIng: String,
            medType: String,
            tabDescrip: String,
            takenFor: String,
            treatment: String,
            noTake: Array,
            userDets: Array
        },
        { timestamps: true }
    );
    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    const Med = mongoose.model("med", schema);
    return Med;
}