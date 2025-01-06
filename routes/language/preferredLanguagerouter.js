const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../../security/Auth');
const {
  addLanguage,
  updateLanguage,
  deleteLanguage,
  getLanguages,
} = require('../../controller/language/preferred_Language Controller');

// Preferred Language Routes

router.post('/preferredlanguages', addLanguage);
router.get('/preferredlanguages', getLanguages);
router.put('/preferredlanguages/:languageId', updateLanguage);
router.delete('/preferredlanguages/:languageId', deleteLanguage);

module.exports = router;
