const Goal = require('../models/setgoal'); 

// Create a new Goal
const createGoal = async (req, res) => {
  try {
    const { goal, levels } = req.body;

    // Check if goal already exists
    const existingGoal = await Goal.findOne({ goal });
    if (existingGoal) {
      return res.status(400).json({ error: 'Goal already exists' });
    }

    
    const newGoal = new Goal({
      goal,
      levels
    });

    await newGoal.save();
    res.status(201).json(newGoal);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create goal' });
  }
};

// Get all Goals
const getAllGoals = async (req, res) => {
  try {
    const goals = await Goal.find();
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve goals' });
  }
};

// Get  Goal by ID
const getGoalById = async (req, res) => {
  try {
    const { id } = req.params;
    const goal = await Goal.findById(id);

    if (!goal) {
      return res.status(404).json({ error: 'Goal not found' });
    }

    res.status(200).json(goal);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve goal' });
  }
};

// Update an existing Goal
const updateGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const { goal, levels } = req.body;

    // Check if the goal exists
    const existingGoal = await Goal.findById(id);
    if (!existingGoal) {
      return res.status(404).json({ error: 'Goal not found' });
    }

    // Update goal and levels
    existingGoal.goal = goal || existingGoal.goal;
    existingGoal.levels = levels || existingGoal.levels;

    await existingGoal.save();
    res.status(200).json(existingGoal);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update goal' });
  }
};

// Delete a Goal
const deleteGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const goal = await Goal.findById(id);

    if (!goal) {
      return res.status(404).json({ error: 'Goal not found' });
    }

    await goal.remove();
    res.status(200).json({ message: 'Goal deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete goal' });
  }
};

module.exports = {
  createGoal,
  getAllGoals,
  getGoalById,
  updateGoal,
  deleteGoal
};
