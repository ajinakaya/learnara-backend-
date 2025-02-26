const LearningGoal = require('../../models/goal/user_learninggoals');
const Goal = require('../../models/goal/setgoal');
const { createNotification } = require("../../controller/notificationController");

// Create a new learning goal
const createLearningGoal = async (req, res) => { 
    try {
    
        const userId = req.user._id;
        const { goalId, frequency, days, duration, time } = req.body;
    
        let goalDoc = await Goal.findById(goalId);

        if (!goalDoc) {
            return res.status(404).json({ error: 'Goal not found in the database.' });
        }

        // Create the learning goal
        const learningGoal = await LearningGoal.create({
            userId,
            goalId: goalDoc._id,
            frequency,
            days,
            duration,
            time
        });

        const populatedGoal = await LearningGoal.findById(learningGoal._id).populate('goalId');

    // Create a notification for the user
    await createNotification(req.user.id, "New learning goal set!");

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
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid learning goal ID" });
        }

        const { frequency, days, duration, time } = req.body;

        let learningGoal = await LearningGoal.findById(id);
        if (!learningGoal) {
            return res.status(404).json({ error: 'Learning goal not found' });
        }

        if (learningGoal.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'You are not authorized to update this learning goal' });
        }

        learningGoal.frequency = frequency || learningGoal.frequency;
        learningGoal.days = days || learningGoal.days;
        learningGoal.duration = duration || learningGoal.duration;
        learningGoal.time = time || learningGoal.time;

        await learningGoal.save();

        const updatedGoal = await LearningGoal.findById(id).populate('goalId');

        res.status(200).json(updatedGoal);
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

        // Remove the learning goal using deleteOne instead of remove
        await LearningGoal.deleteOne({ _id: id });

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
