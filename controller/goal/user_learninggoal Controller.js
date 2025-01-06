const LearningGoal = require('../../models/goal/user_learninggoals');
const Goal = require('../../models/goal/setgoal');

// Create a new learning goal
const createLearningGoal = async (req, res) => { 
    try {
        const userId = req.user._id;
        const { goal, frequency, days, duration, time } = req.body;

        // Find the goal
        let goalDoc = await Goal.findOne({ goal: goal.goal });

        // Create the learning goal
        const learningGoal = await LearningGoal.create({
            userId,
            goalId: goalDoc._id,
            frequency,
            days,
            duration,
            time
        });
        const populatedGoal = await LearningGoal.findById(learningGoal._id)
            .populate('goalId');

        res.status(201).json(populatedGoal);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const getLearningGoals = async (req, res) => {
    try {
        const userId = req.user._id;

    
        const learningGoals = await LearningGoal.find({ userId }).populate('goalId');
        res.status(200).json(learningGoals);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const getLearningGoalById = async (req, res) => {
    try {
        const { id } = req.params;

l
        const learningGoal = await LearningGoal.findById(id).populate('goalId');
        if (!learningGoal) {
            return res.status(404).json({ error: 'Learning goal not found' });
        }

        if (learningGoal.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'You are not authorized to access this learning goal' });
        }

        res.status(200).json(learningGoal);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update 
const updateLearningGoal = async (req, res) => {
    try {
        const { id } = req.params;
        const { goal, frequency, days, duration, time } = req.body;

        // Fetch the learning goal to update
        const learningGoal = await LearningGoal.findById(id);
        if (!learningGoal) {
            return res.status(404).json({ error: 'Learning goal not found' });
        }

        // Ensure the authenticated user is the owner of the learning goal
        if (learningGoal.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'You are not authorized to update this learning goal' });
        }

        // Check if the goal exists
        let goalDoc = await Goal.findOne({ goal: goal.goal });
        // Update the learning goal fields
        learningGoal.goalId = goalDoc._id;
        learningGoal.frequency = frequency;
        learningGoal.days = days;
        learningGoal.duration = duration;
        learningGoal.time = time;

        await learningGoal.save();

        // Populate the goal details in the updated learning goal response
        const populatedGoal = await LearningGoal.findById(learningGoal._id)
            .populate('goalId');

        res.status(200).json(populatedGoal);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete 
const deleteLearningGoal = async (req, res) => {
    try {
        const { id } = req.params;

        // Fetch the learning goal to delete
        const learningGoal = await LearningGoal.findById(id);
        if (!learningGoal) {
            return res.status(404).json({ error: 'Learning goal not found' });
        }

        // Ensure the authenticated user is the owner of the learning goal
        if (learningGoal.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'You are not authorized to delete this learning goal' });
        }

        // Remove the learning goal
        await learningGoal.remove();
        res.status(200).json({ message: 'Learning goal deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createLearningGoal,
    getLearningGoals,
    getLearningGoalById,
    updateLearningGoal,
    deleteLearningGoal
};
