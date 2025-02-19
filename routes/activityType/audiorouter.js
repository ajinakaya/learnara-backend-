const express = require('express');
const router = express.Router();
const AudioActivityValidation = require('../../validation/activityType/audiovalidation');
const upload = require('../../middlewares/upload');
const {
    createAudioActivity,
    getAllAudioActivities,
    getAudioActivityById,
    updateAudioActivity,
    deleteAudioActivity
} = require('../../controller/activityType/audioController');


router.post('/audio',upload.single('audio'),AudioActivityValidation, createAudioActivity);
router.get('/audio', getAllAudioActivities);
router.get('/audio/:id', getAudioActivityById);
router.put('/audio/:id',upload.single('audio'),AudioActivityValidation, updateAudioActivity);
router.delete('/audio/:id', deleteAudioActivity);

module.exports = router;