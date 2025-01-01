const express = require('express');
const { authenticateToken } = require('../security/Auth');
const {
    addUserLanguagePreference,
    updateUserLanguagePreference,
    removeUserLanguagePreference,
    getUserLanguagePreferences,
} = require('../controller/languageselectionController');

const router = express.Router();

router.post('/language', authenticateToken, addUserLanguagePreference);
router.put('/language', authenticateToken, updateUserLanguagePreference);
router.delete('/language/:preferenceId', authenticateToken, removeUserLanguagePreference);
router.get('/language', authenticateToken, getUserLanguagePreferences);

module.exports = router;
