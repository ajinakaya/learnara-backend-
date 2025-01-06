const express = require('express');
const router = express.Router();
const { 
    createVideoActivity,
    getAllVideoActivities,
    getVideoActivityById,
    updateVideoActivity,
    deleteVideoActivity
} = require('../../controller/activityType/video Controller');


// Routes
router.get('/video', getAllVideoActivities);
router.get('/video/:id', getVideoActivityById);
router.post('/video', createVideoActivity);
router.put('/video/:id', updateVideoActivity);
router.delete('/video/:id', deleteVideoActivity);

module.exports = router;