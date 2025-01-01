const FlashcardActivity = require('../models/flashcard');

// Create a Flashcard Activity
const createFlashcardActivity = async (req, res) => {
  try {
    const newFlashcardActivity = await FlashcardActivity.create(req.body);
    res.status(201).json(newFlashcardActivity);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all Flashcard Activities
const getAllFlashcardActivities = async (req, res) => {
  try {
    const activities = await FlashcardActivity.find();
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific Flashcard Activity by ID
const getFlashcardActivityById = async (req, res) => {
  try {
    const activity = await FlashcardActivity.findById(req.params.id);
    if (!activity) return res.status(404).json({ error: "Flashcard Activity not found" });
    res.status(200).json(activity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a Flashcard Activity
const updateFlashcardActivity = async (req, res) => {
  try {
    const updatedActivity = await FlashcardActivity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedActivity) return res.status(404).json({ error: "Flashcard Activity not found" });
    res.status(200).json(updatedActivity);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a Flashcard Activity
const deleteFlashcardActivity = async (req, res) => {
  try {
    const deletedActivity = await FlashcardActivity.findByIdAndDelete(req.params.id);
    if (!deletedActivity) return res.status(404).json({ error: "Flashcard Activity not found" });
    res.status(200).json({ message: "Flashcard Activity deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createFlashcardActivity,
  getAllFlashcardActivities,
  getFlashcardActivityById,
  updateFlashcardActivity,
  deleteFlashcardActivity
};
