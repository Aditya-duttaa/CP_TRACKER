const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { syncCodeforcesData, syncFriendBasicData } = require("../services/codeforcesService");

const signup = async (req, res) => {

    try{

        const { email, password, codeforcesHandle } = req.body;

        if(!email || !password || !codeforcesHandle){

            return res.status(400).json({
                message: "All fields are required"
            });

        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            email,
            password: hashedPassword,
            codeforcesHandle
        });

        res.json({
            message: "User created successfully"
        });

    }
    catch(err){

        res.status(500).json({
            message: "Something went wrong"
        });

    }

};

const login= async (req, res) =>{
    try{
        const {email,password}=req.body

        const user=await User.findOne({email});

        if(!user){
            return res.status(404).json({
                message:"User Not Found"
            })
        }

        const isMatch= await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(401).json({
                message:"Wrong Password"
            })
        }
        await syncCodeforcesData(user.codeforcesHandle);

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        )
        return res.json({
            message: "Login successful",
            token: token
        })
    }
    catch (err) {
    console.log(err);

    res.status(500).json({
        message: err.message
    });
}
}

const addFriend = async (req, res) => {

    try {

        const { handle } = req.body;

        if (!handle) {
            return res.status(400).json({
                message: "Handle is required"
            });
        }

        const user = await User.findById(req.user.id);
        if (handle.toLowerCase() === user.codeforcesHandle.toLowerCase()) {
            return res.status(400).json({
                message: "You cannot add yourself"
            });
        }

        const alreadyFriend = user.friends.find(
            (friend) =>
                friend.handle.toLowerCase() === handle.toLowerCase()
        );

        if (alreadyFriend) {
            return res.status(400).json({
                message: "Friend already exists"
            });
        }
        await syncFriendBasicData(handle);
        user.friends.push({ handle });

        await user.save();

        res.json({
            message: "Friend added successfully"
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Invalid Codeforces handle or sync failed"
        });

    }

};

const getFriends = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user.friends);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong"
        });

    }
};

const removeFriend = async (req, res) => {
    try{
        const handle= req.params.handle;
        const user = await User.findById(req.user.id);

        const before = user.friends.length;
        user.friends = user.friends.filter(
            friend => friend.handle.toLowerCase() !== handle.toLowerCase()
        );

        if (before === user.friends.length) {
            return res.status(404).json({
                message: "Friend not found"
            });
        }
        await user.save();
        res.json({
            message: "Friend deleted successfully"
        });
    }
    catch(err){
        console.log(err);

        res.status(500).json({
            message: "Something went wrong"
        });
    }
}

module.exports = {
    signup,
    login,
    addFriend,
    getFriends,
    removeFriend
};
