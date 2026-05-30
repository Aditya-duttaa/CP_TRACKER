const mongoose = require("mongoose");

const codeforcesSchema = new mongoose.Schema({

    handle: String,
    rating: Number,
    maxRating: Number,
    rank: String,
    maxRank: String

});

const Codeforces = mongoose.model("Codeforces", codeforcesSchema);

module.exports = Codeforces;