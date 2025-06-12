const express = require("express");
const verifyToken = require("../Middleware/authMiddleware");
const adminMiddleware = require("../Middleware/adminMiddleware");
const User = require("../models/User");
const { verify } = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const ActivityLog = require('../models/ActivityLog');

const router = express.Router();

router.get("/dashboard", verifyToken, adminMiddleware, (req, res) => {
    res.json({ msg: "Welcome Admin!", user: req.user });
});

router.get("/users", verifyToken, adminMiddleware, async (req, res) => {
    try {
        console.log("🔹 Request from User:", req.user);

        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ msg: "Error in Fetching Users" });
    }
});

router.get("/users/:id", verifyToken, adminMiddleware, async (req, res) => {
    try {
        const userId = req.params.id;
        console.log("Fetching user with ID backend:", req.params.id);

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ msg: "User not found!" });
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ msg: "Error fetching user", error: err.message });
    }
});

router.get("/count", verifyToken, adminMiddleware, async (req, res) => {
    console.log("Request received at count");
    try {
        const userCount = await User.countDocuments();
        console.log("User Count:", userCount);
        res.status(200).json({ count: userCount });
    } catch (err) {
        console.log("Error fetching user count:", err.message);
        res.status(500).json({ msg: "Error fetching user count", error: err.message });
    }
});


router.post("/create", verifyToken, adminMiddleware, async (req, res) => {
    try {
        const { name, email, role, password } = req.body;

        if (!name || !email || !role || !password) {
            return res.status(400).json({ msg: "All fields are required!" });
        }

        const hash = await bcrypt.hash(password, 10);
        console.log("Hash Generated", hash);
        const newUser = await User.create({ name, email, role, password: hash });
        console.log("Saved User:", newUser);

        res.status(201).json({ msg: "User created successfully!", user: newUser });

    } catch (err) {
        res.status(500).json({ msg: "Error creating user", error: err.message })
    }
});

router.post("/log", verifyToken, adminMiddleware, async (req, res) => {
    try {
        const { action, admin } = req.body;
        const log = new ActivityLog({ action, admin });
        await log.save();
        console.log("Log saved:", log);
        res.status(201).json({ message: "Log saved successfully!" });
    } catch (error) {
        console.log("Error saving log:", error);
        res.status(500).json({ error: "Error saving log" });
    }
});

router.get("/logs", verifyToken, adminMiddleware, async (req, res) => {
    try {
        const logs = await ActivityLog.find()
            .populate("admin affectedUser")
            .sort({ timestamp: -1 })
            .limit(7);

        const modifiedLogs = logs.map(log => ({
            ...log.toObject(),
            affectedUser: log.affectedUser ? log.affectedUser : { name: "Unknown User" }
        }));

        console.log("Modified Logs:", modifiedLogs);

        res.status(200).json({ logs: modifiedLogs });

    } catch (err) {
        console.error("Error fetching logs:", err);
        res.status(500).json({ msg: "Error fetching logs", error: err.message });
    }
});

router.delete("/users/:id", verifyToken, adminMiddleware, async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ msg: "User not found!" });
        }
        const newLog = await ActivityLog.create({
            admin: req.adminId,
            action: "DELETE",
            affectedUser: userId
        });

        console.log("Activity Log Saved:", newLog);
        res.status(200).json({ msg: "User deleted successfully!", userId });
    } catch (err) {
        res.status(500).json({ msg: "Error deleting user", error: err.message });
    }
});

router.put("/users/:id", verifyToken, adminMiddleware, async (req, res) => {
    try {
        const userId = req.params.id;
        const { name, email, role, status } = req.body;

        console.log("Editing User:", userId);

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: { name, email, role, status } },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ msg: "User not found" });
        }

        console.log("Admin ID in Edit API:", req.adminId);

        const newLog = await ActivityLog.create({
            admin: req.adminId,
            action: "EDIT",
            affectedUser: userId
        });
        console.log("Activity Log Saved:", newLog);


        res.status(200).json({ msg: "User updated successfully", user: updatedUser });
    } catch (err) {
        res.status(500).json({ msg: "Error updating user", error: err.message });
    }
});

module.exports = router;