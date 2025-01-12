const express = require('express');
const router = express.Router();
const FlashcardValidation = require('../../validation/activityType/flashcardvalidation');
const { 
    createFlashcardActivity,
    getAllFlashcardActivities,
    getFlashcardActivityById,
    updateFlashcardActivity,
    deleteFlashcardActivity
} = require('../../controller/activityType/flashcardController');

router.get('/flashcard', getAllFlashcardActivities);
router.get('/flashcard/:id', getFlashcardActivityById);
router.post('/flashcard',FlashcardValidation, createFlashcardActivity);
router.put('/flashcard/:id',FlashcardValidation, updateFlashcardActivity);
router.delete('/flashcard/:id', deleteFlashcardActivity);

module.exports = router;
