const express = require("express");
const router = express.Router();
const Record = require('../models/Record');
const User = require('../models/User');
const Habit = require('../models/Habit');
//NOT WORKING, but would like to make work

// Endpoint to add a record of habit completion
/* router.post("/habits/:habitId/done",async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const habitId = req.params.habitId;
        const user = await User.findOne({ auth: token });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const habit = await Habit.findOne({ _id: habitId, user: user._id });
        if (!habit) {
            return res.status(404).json({ message: "Habit not found" });
        }
        const newRecord = new Record({
            habit: habitId,
            date: new Date(),
            status: 'Complete',
        });
        const savedRecord = await newRecord.save();
        return res.status(201).json(savedRecord);
    } catch (error) {
        console.error("Error adding record:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
  }); */

module.exports = router;