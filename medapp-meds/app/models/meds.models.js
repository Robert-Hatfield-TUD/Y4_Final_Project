const { mongoose } = require(".");

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