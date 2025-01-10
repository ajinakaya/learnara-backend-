const express = require('express');
const router = express.Router();
const { 
  createQuizActivity,
  getAllQuizActivities,
  getQuizActivityById,
  updateQuizActivity,
  deleteQuizActivity
} = require('../../controller/activityType/quizController');


// Routes
router.get('/quiz', getAllQuizActivities);
router.get('/quiz/:id', getQuizActivityById);
router.post('/quiz', createQuizActivity);
router.put('/quiz/:id', updateQuizActivity);
router.delete('/quiz/:id', deleteQuizActivity);

module.exports = router;