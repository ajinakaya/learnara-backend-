const express = require('express');
const router = express.Router();
const {
    getAllChapters,
    getChapterById,
     createChapter,
     updateChapter,
     deleteChapter 
    } = require('../controller/chapterController');

// Routes
router.get('/chapters', getAllChapters);
router.get('/chapters/:id', getChapterById);
router.post('/chapters', createChapter);
router.put('/chapters/:id', updateChapter);
router.delete('/chapters/:id', deleteChapter);

module.exports = router;