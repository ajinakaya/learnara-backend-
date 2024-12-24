const LearningGoal = require('../models/LearningGoal');

// Create or update learning goal
const setLearningGoal = async (req, res) => {
  const { userId } = req.user; 
  const { goal } = req.body;

  if (!goal) {
    return res.status(400).json({ error: 'Goal is required' });
  }

  try {
    // Check if the learning goal already exists for this user
    const existingGoal = await LearningGoal.findOne({ userId });

    if (existingGoal) {
      // Update existing goal
      existingGoal.goal = goal;
      await existingGoal.save();
      return res.status(200).json({ message: 'Learning goal updated', data: existingGoal });
    }

    // Create new learning goal
    const newGoal = new LearningGoal({ userId, goal });
    await newGoal.save();
    return res.status(201).json({ message: 'Learning goal set', data: newGoal });
  } catch (error) {
    console.error('Error setting learning goal:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get learning goal
const getLearningGoal = async (req, res) => {
  const { userId } = req.user;

  try {
    const goal = await LearningGoal.findOne({ userId });

    if (!goal) {
      return res.status(404).json({ error: 'Learning goal not found' });
    }

    res.status(200).json({ data: goal });
  } catch (error) {
    console.error('Error fetching learning goal:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete learning goal
const deleteLearningGoal = async (req, res) => {
  const { userId } = req.user;

  try {
    const deletedGoal = await LearningGoal.findOneAndDelete({ userId });

    if (!deletedGoal) {
      return res.status(404).json({ error: 'Learning goal not found' });
    }

    res.status(200).json({ message: 'Learning goal deleted', data: deletedGoal });
  } catch (error) {
    console.error('Error deleting learning goal:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  setLearningGoal,
  getLearningGoal,
  deleteLearningGoal,
};
