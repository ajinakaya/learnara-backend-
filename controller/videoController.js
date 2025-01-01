const VideoActivity = require('../models/video');

// Create a Video Activity
const createVideoActivity = async (req, res) => {
  try {
    const newVideoActivity = await VideoActivity.create(req.body);
    res.status(201).json(newVideoActivity);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all Video Activities
const getAllVideoActivities = async (req, res) => {
  try {
    const activities = await VideoActivity.find();
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific Video Activity by ID
const getVideoActivityById = async (req, res) => {
  try {
    const activity = await VideoActivity.findById(req.params.id);
    if (!activity) return res.status(404).json({ error: "Video Activity not found" });
    res.status(200).json(activity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a Video Activity
const updateVideoActivity = async (req, res) => {
  try {
    const updatedActivity = await VideoActivity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedActivity) return res.status(404).json({ error: "Video Activity not found" });
    res.status(200).json(updatedActivity);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a Video Activity
const deleteVideoActivity = async (req, res) => {
  try {
    const deletedActivity = await VideoActivity.findByIdAndDelete(req.params.id);
    if (!deletedActivity) return res.status(404).json({ error: "Video Activity not found" });
    res.status(200).json({ message: "Video Activity deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createVideoActivity,
  getAllVideoActivities,
  getVideoActivityById,
  updateVideoActivity,
  deleteVideoActivity
};
