const express = require('express');
const {
    getActivitiesByType
   
} = require('../../controller/activityType/activityController');

const router = express.Router();

router.get('/activities', getActivitiesByType);

module.exports = router;
