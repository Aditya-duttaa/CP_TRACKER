const mongoose = require("mongoose");

const contestHistorySchema = new mongoose.Schema({

    handle: String,
    totalContests: Number,
    contests: [
        {
            contestName: String,
            rank: Number,
            oldRating: Number,
            newRating: Number,
            ratingChange: Number
        }
    ]

}, { timestamps: true });

const ContestHistory = mongoose.model("ContestHistory", contestHistorySchema);

module.exports = ContestHistory;