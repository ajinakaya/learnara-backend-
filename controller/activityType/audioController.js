const AudioActivity = require('../../models/activityType/audio');

// Create an Audio Activity
const createAudioActivity = async (req, res) => {
  const { title, description, duration, order, resources, transcript, difficulty } = req.body;
  const audio = req.file ? req.file.path : null;  

  try {
    const newAudioActivity = await AudioActivity.create({
      title,
      description,
      audio,
      duration,
      order,
      resources,
      transcript,
      difficulty
    });

    res.status(201).json(newAudioActivity);
  } catch (error) {
    res.status(500).json({ error: `Server error: ${error.message}` });
  }
};


// Get all Audio Activities
const getAllAudioActivities = async (req, res) => {
  try {
    const activities = await AudioActivity.find();
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific Audio Activity by ID
const getAudioActivityById = async (req, res) => {
  try {
    const activity = await AudioActivity.findById(req.params.id);
    if (!activity) return res.status(404).json({ error: "Audio Activity not found" });
    res.status(200).json(activity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Audio Activity 
const updateAudioActivity = async (req, res) => {
  try {
    const { title, description, duration, order, resources, transcript, difficulty } = req.body;
    const audio= req.file ? req.file.path : null;  // Get the uploaded audio file path

    const updatedActivity = await AudioActivity.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        audio: audio,
        duration,
        order,
        resources,
        transcript,
        difficulty
      },
      { new: true } 
    );

    if (!updatedActivity) return res.status(404).json({ error: "Audio Activity not found" });

    res.status(200).json(updatedActivity);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an Audio Activity
const deleteAudioActivity = async (req, res) => {
  try {
    const deletedActivity = await AudioActivity.findByIdAndDelete(req.params.id);
    if (!deletedActivity) return res.status(404).json({ error: "Audio Activity not found" });
    res.status(200).json({ message: "Audio Activity deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
    createAudioActivity,
    getAllAudioActivities,
    getAudioActivityById,
    updateAudioActivity,
    deleteAudioActivity
  };

