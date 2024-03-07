const mongoose = require('mongoose');
const express = require('express');
const habitlist = mongoose.model('habit'); 

//NEW HABIT
Router.post('/user/:userId/habits')


const Habit = require(‘/user/:userId/habits’);
// CREATE A NEW HABIT
exports.createHabit = async (req, res) => {
 const { habitName} = req.body;
 try {
   const habit = new Habit({ habitName });
   const savedhabit = await habit.save();
   res.status(201).json(savedSong);
 } catch (error) {
   res.status(500).json({ error: 'An error occurred while creating the habit' });
 }
};


// GET ALL HABITS
exports.getAllHabits = async (req, res) => {
  try {
    const habit = await Habit.find();
    res.json(habit);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while seeking habit' });
  }
 };

 // GET A HABIT BY HABIT ID
exports.getHabit = async (req, res) => {
  const HabitId = req.params.id;
  try {
    const habit = await Habit.findById(habitId);
      if (!habit) {
        return res.status(404).json({ error: 'No habit found' });
        }
        res.json(song);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while seeking habit' });
  }
 };

 // UPDATE HABIT BY ID
exports.updateHabit = async (req, res) => {
  const habitId = req.params.id;
  const { habitName } = req.body;
  try {
    const updatedHabit = await Habit.findByIdAndUpdate(
    habitId,{ /*habitName*/ },{ new: true });
    if (!updatedHabit) {
        return res.status(404).json({ error: 'Habit not found' });
    }
    res.json(updatedHabit);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the Habit' });
  }
 };

 // REMOVE A HABIT BY ID
exports.deleteHabit = async (req, res) => {
  const habitId = req.params.id;
  try {
    const deletedHabit = await Song.findByIdAndRemove(habitId);
    if (!deletedHabit) {
  return res.status(404).json({ error: 'No Habit found' });
  }
    res.json(deletedHabit);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while removing the Habit' });
  }
 };
 