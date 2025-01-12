const express = require('express');
const router = express.Router();
const QuizValidation = require('../../validation/activityType/quizvalidation');
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
router.post('/quiz', QuizValidation,createQuizActivity);
router.put('/quiz/:id', QuizValidation,updateQuizActivity);
router.delete('/quiz/:id', deleteQuizActivity);

module.exports = router;