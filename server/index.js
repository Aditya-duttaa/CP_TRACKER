const mongoose = require("mongoose");
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const User = require("./models/User");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const logger = require("./middleware/logger");
connectDB();
app.use(logger);
app.use(cors());
app.use(express.json())
app.use(userRoutes);

const auth = require("./middleware/auth");

app.get("/users", auth, async (req, res) => {
    console.log(req.user);
    const users = await User.find();

    res.json(users);

});




app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});