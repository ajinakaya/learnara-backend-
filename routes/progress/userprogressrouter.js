const express = require('express');
const router = express.Router();
const { 
    updateUserProgress, 
    getUserProgress, 
    getCourseCompletionPercentage ,
    
} = require('../../controller/progress/userprogress Controller');

const { authenticateToken } = require("../../security/Auth");

router.post('/userProgress', authenticateToken,updateUserProgress);
router.get('/userProgress/:courseId', authenticateToken,getUserProgress);
router.get('/completion/:courseId', authenticateToken,getCourseCompletionPercentage);

module.exports = router;
