const express = require('express');
const router = express.Router();
const { 
    updateUserProgress, 
    getUserProgress, 
    getCourseCompletionPercentage ,
    getCurrentSubLesson
} = require('../../controller/progress/userprogressController');

const { authenticateToken } = require("../../security/Auth");

// Update user progress
router.post('/userProgress', authenticateToken,updateUserProgress);

// Get user progress
router.get('/userProgress/:courseId', authenticateToken,getUserProgress);

// Get course completion percentage
router.get('/completion/:courseId', authenticateToken,getCourseCompletionPercentage);

router.get('/currentSubLesson/:courseId/', authenticateToken, getCurrentSubLesson);


module.exports = router;
