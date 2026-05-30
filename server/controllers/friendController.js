const User = require("../models/User");
const Codeforces = require("../models/Codeforces");
const ContestHistory = require("../models/ContestHistory");
const { syncCodeforcesData,syncFriendBasicData } = require("../services/codeforcesService");

const compareFriends = async (req, res) => {

    try {

        const user = await User.findById(req.user.id);
        const handles = [
            user.codeforcesHandle,
            ...user.friends.map(friend => friend.handle)
        ];

        const handleRegex = handles.map(handle => {
            return new RegExp(`^${handle}$`, "i");
        });

        const profiles = await Codeforces.find({
            handle: { $in: handleRegex }
        });

        const histories = await ContestHistory.find({
            handle: { $in: handleRegex }
        });

        const leaderboard = profiles.map((profile) => {

        const history = histories.find(
            (h) => h.handle.toLowerCase() === profile.handle.toLowerCase()
        );

        return {
            handle: profile.handle,
            rating: profile.rating,
            maxRating: profile.maxRating,
            rank: profile.rank,
            maxRank: profile.maxRank,
            totalContests: history ? history.totalContests: 0
        };

        });

        leaderboard.sort((a, b) => b.rating - a.rating);

        leaderboard.forEach((user, index) => {
            user.rankPosition = index + 1;
        });

        res.json(leaderboard);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Something went wrong"
        });

    }

};

const syncFriends = async (req, res) => {

    try {

        const user = await User.findById(req.user.id);

        await Promise.all(
            user.friends.map(friend =>
                syncFriendBasicData(friend.handle)
            )
        );

        res.json({
            message: "Friends synced successfully",
            syncedCount: user.friends.length
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Something went wrong"
        });

    }

};

module.exports = {
    compareFriends,
    syncFriends
};