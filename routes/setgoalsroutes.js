const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../security/Auth');
const {
  setLearningGoal,
  getLearningGoal,
  deleteLearningGoal,
} = require('../controller/learningGoalController');

// Learning Goal Routes
router.post('/set', authenticateToken, setLearningGoal);
router.get('/get', authenticateToken, getLearningGoal);
router.delete('/delete', authenticateToken, deleteLearningGoal);

module.exports = router;
