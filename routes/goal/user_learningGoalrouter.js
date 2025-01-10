const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../../security/Auth');
const {
  createLearningGoal,
  getLearningGoals,
  getLearningGoalById,
  updateLearningGoal,
  deleteLearningGoal,
} = require('../../controller/goal/user_learninggoalController');

// Learning Goal Routes
router.post('/goal', authenticateToken, createLearningGoal);
router.get('/get', authenticateToken, getLearningGoals);
router.get('/get/:id', authenticateToken, getLearningGoalById);
router.put('/update', authenticateToken, updateLearningGoal);
router.delete('/delete', authenticateToken, deleteLearningGoal);

module.exports = router;
