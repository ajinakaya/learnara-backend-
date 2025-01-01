const QuizActivity = require('../models/quiz');

// Create a Quiz Activity
const createQuizActivity = async (req, res) => {
  try {
    const newQuizActivity = await QuizActivity.create(req.body);
    res.status(201).json(newQuizActivity);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all Quiz Activities
const getAllQuizActivities = async (req, res) => {
  try {
    const activities = await QuizActivity.find();
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific Quiz Activity by ID
const getQuizActivityById = async (req, res) => {
  try {
    const activity = await QuizActivity.findById(req.params.id);
    if (!activity) return res.status(404).json({ error: "Quiz Activity not found" });
    res.status(200).json(activity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a Quiz Activity
const updateQuizActivity = async (req, res) => {
  try {
    const updatedActivity = await QuizActivity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedActivity) return res.status(404).json({ error: "Quiz Activity not found" });
    res.status(200).json(updatedActivity);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a Quiz Activity
const deleteQuizActivity = async (req, res) => {
  try {
    const deletedActivity = await QuizActivity.findByIdAndDelete(req.params.id);
    if (!deletedActivity) return res.status(404).json({ error: "Quiz Activity not found" });
    res.status(200).json({ message: "Quiz Activity deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createQuizActivity,
  getAllQuizActivities,
  getQuizActivityById,
  updateQuizActivity,
  deleteQuizActivity
};
