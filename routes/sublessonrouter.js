const express = require('express');
const router = express.Router();
const { 
  createSubLesson,
  getAllSubLessons,
  getSubLessonById,
  updateSubLesson,
  deleteSubLesson
} = require('../controller/sublessonController');

// Routes
router.get('/lesson', getAllSubLessons);
router.get('/lesson/:id', getSubLessonById);
router.post('/lesson', createSubLesson);
router.put('/lesson/:id', updateSubLesson);
router.delete('/lesson/:id', deleteSubLesson);

module.exports = router;