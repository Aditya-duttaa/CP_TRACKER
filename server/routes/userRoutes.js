const express = require("express");

const router = express.Router();
const auth = require("../middleware/auth");

const { signup,login,addFriend, getFriends,removeFriend} = require("../controllers/userController");
const { getCodeforcesProfile, getContestHistory, 
    getRatingGraph, getTagStats, getDashboard, getRatingDistribution} = require("../controllers/codeforcesController");
const { compareFriends,syncFriends} = require("../controllers/friendController");

router.post("/signup", signup);
router.post("/login", login);
router.get("/codeforces/:handle",auth,getCodeforcesProfile);
router.get("/codeforces/:handle/contests",auth, getContestHistory);
router.get("/codeforces/:handle/rating-graph", auth, getRatingGraph);
router.get("/codeforces/:handle/tag-stats", auth, getTagStats);
router.get("/codeforces/:handle/dashboard", auth, getDashboard);
router.post("/friends",auth,addFriend);
router.get("/friends",auth,getFriends)
router.delete("/friends/:handle", auth, removeFriend);
router.get("/friends/compare", auth, compareFriends);
router.post("/friends/sync", auth, syncFriends);
router.get("/codeforces/:handle/rating-distribution", auth, getRatingDistribution);
module.exports = router;