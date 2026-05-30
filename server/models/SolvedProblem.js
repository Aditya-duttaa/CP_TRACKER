const mongoose = require("mongoose");

const solvedProblemSchema = new mongoose.Schema({

    handle: String,

    problems: [
        {
            name: String,
            contestId: Number,
            index: String,
            rating: Number,
            tags: [String]
        }
    ]

}, { timestamps: true });

const SolvedProblem = mongoose.model("SolvedProblem", solvedProblemSchema);

module.exports = SolvedProblem;