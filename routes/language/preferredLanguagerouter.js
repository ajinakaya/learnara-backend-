const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../../security/Auth');
const PreferredLanguageValidation = require('../../validation/language/PreferredLanguagevalidation');
const upload = require('../../middlewares/upload');
const {
  addLanguage,
  updateLanguage,
  deleteLanguage,
  getLanguages,
} = require('../../controller/language/preferred_LanguageController');

// Preferred Language Routes

router.post('/preferredlanguages',upload.single('languageImage'), PreferredLanguageValidation,addLanguage);
router.get('/preferredlanguages', getLanguages);
router.put('/preferredlanguages/:languageId', upload.single('languageImage'),PreferredLanguageValidation,updateLanguage);
router.delete('/preferredlanguages/:languageId', deleteLanguage);

module.exports = router;
