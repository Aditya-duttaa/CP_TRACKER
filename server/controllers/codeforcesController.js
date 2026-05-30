const Codeforces = require("../models/Codeforces");
const ContestHistory = require("../models/ContestHistory");
const User = require("../models/User");
const SolvedProblem = require("../models/SolvedProblem");

const getCodeforcesProfile = async (req, res) => {

    try {
        const user = await User.findById(req.user.id);

        const profile = await Codeforces.findOne({
            handle: { $regex: `^${user.codeforcesHandle}$`, $options: "i" }
        });

        if (!profile) {
            return res.status(404).json({
                message: "Profile not found. Please login/sync first."
            });
        }

        res.json(profile);

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Something went wrong"
        });

    }

};

const getContestHistory = async (req, res) => {

    try {

        const user = await User.findById(req.user.id);
        const limit = parseInt(req.query.limit) || 10;

        const history = await ContestHistory.findOne({
            handle: { $regex: `^${user.codeforcesHandle}$`, $options: "i" }
        });

        if (!history) {
            return res.status(404).json({
                message: "Contest history not found. Please login/sync first."
            });
        }

        res.json(history.contests.slice(-limit));

    } catch (err) {

        res.status(500).json({
            message: "Something went wrong"
        });

    }

};

const getRatingGraph = async (req, res) => {

    try {

        const user = await User.findById(req.user.id);

        const history = await ContestHistory.findOne({
            handle: { $regex: `^${user.codeforcesHandle}$`, $options: "i" }
        });

        if (!history) {
            return res.status(404).json({
                message: "Contest history not found"
            });
        }

        const graphData = history.contests.map((contest) => {
            return {
                contestName: contest.contestName,
                rating: contest.newRating
            };
        });

        res.json(graphData);

    } catch (err) {
        res.status(500).json({
            message: "Something went wrong"
        });
    }

};

const getTagStats = async (req, res) => {

    try {

        const user = await User.findById(req.user.id);

        const solvedData = await SolvedProblem.findOne({
            handle: { $regex: `^${user.codeforcesHandle}$`, $options: "i" }
        });

        if (!solvedData) {
            return res.status(404).json({
                message: "Solved problems not found. Please login/sync first."
            });
        }

        const tagStats = {};

        solvedData.problems.forEach((problem) => {

            problem.tags.forEach((tag) => {

                if (!tagStats[tag]) {
                    tagStats[tag] = 0;
                }

                tagStats[tag]++;

            });

        });

        res.json(tagStats);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Something went wrong"
        });

    }

};

const getDashboard = async (req, res) => {

    try {

        const user = await User.findById(req.user.id);

        const profile = await Codeforces.findOne({
            handle: { $regex: `^${user.codeforcesHandle}$`, $options: "i" }
        });

        const history = await ContestHistory.findOne({
            handle: { $regex: `^${user.codeforcesHandle}$`, $options: "i" }
        });

        const solvedData = await SolvedProblem.findOne({
            handle: { $regex: `^${user.codeforcesHandle}$`, $options: "i" }
        });

        if (!profile || !history || !solvedData) {
            return res.status(404).json({
                message: "Dashboard data not found. Please login/sync first."
            });
        }

        res.json({
            handle: profile.handle,
            rating: profile.rating,
            maxRating: profile.maxRating,
            rank: profile.rank,
            maxRank: profile.maxRank,
            totalSolved: solvedData.problems.length,
            totalContests: history.contests.length
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Something went wrong"
        });

    }

};

const getRatingDistribution = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        const solvedData = await SolvedProblem.findOne({
            handle: { $regex: `^${user.codeforcesHandle}$`, $options: "i" }
        });

        if (!solvedData) {
            return res.status(404).json({
                message: "Solved problems not found"
            });
        }

        const distribution = {
            "800-999": 0,
            "1000-1199": 0,
            "1200-1399": 0,
            "1400-1599": 0,
            "1600-1799": 0,
            "1800-1999": 0,
            "2000+": 0,
            "Unrated": 0
        };

        solvedData.problems.forEach((problem) => {
            const rating = problem.rating;

            if (!rating) distribution["Unrated"]++;
            else if (rating < 1000) distribution["800-999"]++;
            else if (rating < 1200) distribution["1000-1199"]++;
            else if (rating < 1400) distribution["1200-1399"]++;
            else if (rating < 1600) distribution["1400-1599"]++;
            else if (rating < 1800) distribution["1600-1799"]++;
            else if (rating < 2000) distribution["1800-1999"]++;
            else distribution["2000+"]++;
        });

        res.json(distribution);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong"
        });
    }
};

module.exports = {
    getCodeforcesProfile,
    getContestHistory,
    getRatingGraph,
    getTagStats,
    getDashboard,
    getRatingDistribution
};