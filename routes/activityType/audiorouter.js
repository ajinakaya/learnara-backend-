const express = require('express');

const router = express.Router();
const {
    createAudioActivity,
    getAllAudioActivities,
    getAudioActivityById,
    updateAudioActivity,
    deleteAudioActivity
} = require('../../controller/activityType/audio Controller');


router.post('/audio', createAudioActivity);
router.get('/audio', getAllAudioActivities);
router.get('/audio/:id', getAudioActivityById);
router.put('/audio/:id', updateAudioActivity);
router.delete('/audio/:id', deleteAudioActivity);

module.exports = router;