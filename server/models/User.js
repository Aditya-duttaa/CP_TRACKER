const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    email: String,
    password: String,
    codeforcesHandle: String,
    friends: [
        {
            handle: String
        }
    ]
});

const User = mongoose.model("User", userSchema);

module.exports = User;