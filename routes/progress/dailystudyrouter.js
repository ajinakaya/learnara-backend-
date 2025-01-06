const express = require('express');
const router = express.Router();
const { 
    getDailyStudy,
    updateDailyStudy,
    getAllDailyStudy
} = require('../../controller/progress/dailystudy Controller');

const { authenticateToken } = require("../../security/Auth");

router.get('/dailyStudy/:date', authenticateToken, getDailyStudy);
router.put('/dailyStudy/update', authenticateToken, updateDailyStudy);
router.get('/dailyStudy', authenticateToken, getAllDailyStudy);

module.exports = router;
