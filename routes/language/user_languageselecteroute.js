const express = require('express');
const { authenticateToken } = require('../../security/Auth');
const {
    addUserLanguagePreference,
    updateUserLanguagePreference,
    removeUserLanguagePreference,
    getUserLanguagePreferences,
} = require('../../controller/language/user_languageselection Controller');

const router = express.Router();

router.post('/language', authenticateToken, addUserLanguagePreference);
router.put('/language', authenticateToken, updateUserLanguagePreference);
router.delete('/language/:preferenceId', authenticateToken, removeUserLanguagePreference);
router.get('/language', authenticateToken, getUserLanguagePreferences);

module.exports = router;
