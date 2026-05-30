const axios = require("axios");
const Codeforces = require("../models/Codeforces");
const ContestHistory = require("../models/ContestHistory");
const SolvedProblem = require("../models/SolvedProblem");

const syncCodeforcesData = async (handle) => {

    const profileResponse = await axios.get(
        `https://codeforces.com/api/user.info?handles=${handle}`
    );

    const user = profileResponse.data.result[0];

    await Codeforces.findOneAndUpdate(
        { handle: user.handle },
        {
            handle: user.handle,
            rating: user.rating,
            maxRating: user.maxRating,
            rank: user.rank,
            maxRank: user.maxRank
        },
        { new: true, upsert: true }
    );

    const ratingResponse = await axios.get(
        `https://codeforces.com/api/user.rating?handle=${handle}`
    );

    const totalContests = ratingResponse.data.result.length;
    const contests = ratingResponse.data.result.slice(-100).map((contest) => {
        return {
            contestName: contest.contestName,
            rank: contest.rank,
            oldRating: contest.oldRating,
            newRating: contest.newRating,
            ratingChange: contest.newRating - contest.oldRating
        };
    });

    await ContestHistory.findOneAndUpdate(
        { handle: user.handle },
        {
            handle: user.handle,
            totalContests,
            contests: contests
        },
        { new: true, upsert: true }
    );


    const submissionResponse = await axios.get(
        `https://codeforces.com/api/user.status?handle=${handle}`
    );

    const submissions = submissionResponse.data.result;

    const solvedMap = new Map();

    submissions.forEach((sub) => {

        if (sub.verdict === "OK") {

            const problem = sub.problem;

            const key = `${problem.contestId}-${problem.index}`;

            if (!solvedMap.has(key)) {
                solvedMap.set(key, {
                    name: problem.name,
                    contestId: problem.contestId,
                    index: problem.index,
                    rating: problem.rating,
                    tags: problem.tags
                });
            }

        }

    });

    const solvedProblems = Array.from(solvedMap.values());
    await SolvedProblem.findOneAndUpdate(
        { handle: user.handle },
        {
            handle: user.handle,
            problems: solvedProblems
        },
        { new: true, upsert: true }
    );

};

const syncFriendBasicData = async (handle) => {

    const profileResponse = await axios.get(
        `https://codeforces.com/api/user.info?handles=${handle}`
    );

    const user = profileResponse.data.result[0];

    await Codeforces.findOneAndUpdate(
        { handle: user.handle },
        {
            handle: user.handle,
            rating: user.rating,
            maxRating: user.maxRating,
            rank: user.rank,
            maxRank: user.maxRank
        },
        { returnDocument: "after", upsert: true }
    );

    const ratingResponse = await axios.get(
        `https://codeforces.com/api/user.rating?handle=${handle}`
    );

    const totalContests = ratingResponse.data.result.length;

    const contests = ratingResponse.data.result.slice(-100).map((contest) => {
        return {
            contestName: contest.contestName,
            rank: contest.rank,
            oldRating: contest.oldRating,
            newRating: contest.newRating,
            ratingChange: contest.newRating - contest.oldRating
        };
    });

    await ContestHistory.findOneAndUpdate(
        { handle: user.handle },
        {
            handle: user.handle,
            totalContests,
            contests
        },
        { returnDocument: "after", upsert: true }
    );

};

module.exports = {
    syncCodeforcesData,
    syncFriendBasicData
};