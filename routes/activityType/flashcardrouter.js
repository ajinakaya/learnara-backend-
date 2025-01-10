const express = require('express');
const router = express.Router();
const { 
    createFlashcardActivity,
    getAllFlashcardActivities,
    getFlashcardActivityById,
    updateFlashcardActivity,
    deleteFlashcardActivity
} = require('../../controller/activityType/flashcardController');

router.get('/flashcard', getAllFlashcardActivities);
router.get('/flashcard/:id', getFlashcardActivityById);
router.post('/flashcard', createFlashcardActivity);
router.put('/flashcard/:id', updateFlashcardActivity);
router.delete('/flashcard/:id', deleteFlashcardActivity);

module.exports = router;
