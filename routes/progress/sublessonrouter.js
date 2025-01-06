const express = require('express');
const router = express.Router();
const { 
    getCurrentSubLesson, 
    updateSubLessonProgress, 
    getAllSubLessonProgress 
} = require('../../controller/progress/sublessonprogress Controller');

const { authenticateToken } = require("../../security/Auth");

router.get('/sublessonProgress/:subLessonId', authenticateToken, getCurrentSubLesson);
router.put('/sublessonProgress', authenticateToken, updateSubLessonProgress);
router.get('/sublessonProgress/all', authenticateToken, getAllSubLessonProgress);

module.exports = router;
