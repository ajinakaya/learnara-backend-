const express = require('express');
const router = express.Router();
const VideoValidation = require('../../validation/activityType/videovalidation');
const upload = require('../../middlewares/upload');
const { 
    createVideoActivity,
    getAllVideoActivities,
    getVideoActivityById,
    updateVideoActivity,
    deleteVideoActivity
} = require('../../controller/activityType/videoController');


// Routes
router.get('/video', getAllVideoActivities);
router.get('/video/:id', getVideoActivityById);
router.post('/video',upload.single('video'), VideoValidation,createVideoActivity);
router.put('/video/:id',VideoValidation, updateVideoActivity);
router.delete('/video/:id', deleteVideoActivity);

module.exports = router;