const express = require('express');
const router = express.Router();
const { 
    getActivityProgress,
    updateActivityProgress,
    getAllActivitiesProgress
} = require('../../controller/progress/activityProgressController');

const { authenticateToken } = require("../../security/Auth");


router.put('/activityProgress', authenticateToken, updateActivityProgress);
router.get('/activityProgress/:activityId', authenticateToken, getActivityProgress);
router.post('/activityProgress', authenticateToken, getAllActivitiesProgress);

module.exports = router;
