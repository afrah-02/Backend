const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // Added missing bcrypt import
require("dotenv").config();

const User = require("./src/models/user");
const userRoutes = require("./src/routes/user"); // Import user routes

const app = express(); // Initialize Express first
const PORT = 3000;

app.use(express.json()); // Middleware to parse JSON
app.use("/api/users", userRoutes); // Use the routes

// Home page API
app.get("/", (req, res) => {
    res.send("<h1 align=center>Welcome to the MERN stack week 2 session</h1>");
});

// Registration API
app.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        res.json({ message: "User Registered Successfully" });
        console.log("User Registration completed...");
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error in Registration" });
    }
});

// Login API
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        res.json({ message: "Login Successful", username: user.username });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error in Login" });
    }
});

// Database Connection
mongoose
    .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("DB connected successfully..."))
    .catch((err) => console.log(err));

// Start Server
app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    }
    console.log("Server is running on port: " + PORT);
});