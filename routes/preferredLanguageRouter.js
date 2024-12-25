const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../security/Auth');
const {
  setPreferredLanguage,
  getPreferredLanguage,
  deletePreferredLanguage,
} = require('../controller/preferredLanguageController');

// Preferred Language Routes
router.post('/set', authenticateToken, setPreferredLanguage);
router.get('/get', getPreferredLanguage);
router.delete('/delete', authenticateToken, deletePreferredLanguage);

module.exports = router;
