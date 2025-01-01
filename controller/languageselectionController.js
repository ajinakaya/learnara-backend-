const UserLanguagePreference = require('../models/userlanguagepreference');
const PreferredLanguage = require('../models/PreferredLanguage');

// Add a language preference
const addUserLanguagePreference = async (req, res) => {
  try {
    const userId = req.user._id;
    const { languageId } = req.body;

    if (!languageId) {
      return res.status(400).json({ error: 'Language ID is required' });
    }

    const language = await PreferredLanguage.findById(languageId);
    if (!language) {
      return res.status(404).json({ error: 'Language not found' });
    }

    const existingPreference = await UserLanguagePreference.findOne({ userId, languageName: language.languageName });
    if (existingPreference) {
      return res.status(400).json({ error: 'Preference already exists' });
    }

    const userPreference = await UserLanguagePreference.create({
      userId,
      languageName: language.languageName,
      languageImage: language.languageImage,
    });

    res.status(201).json(userPreference);
  } catch (error) {
    res.status(500).json({ error: `Server error: ${error.message}` });
  }
};

// Update a language preference
const updateUserLanguagePreference = async (req, res) => {
  try {
    const userId = req.user._id;
    const { preferenceId, newLanguageId } = req.body;

    // Validate input
    if (!preferenceId || !newLanguageId) {
      return res.status(400).json({ error: 'Preference ID and new language ID are required' });
    }

    const newLanguage = await PreferredLanguage.findById(newLanguageId);
    if (!newLanguage) {
      return res.status(404).json({ error: 'New language not found' });
    }

    const userPreference = await UserLanguagePreference.findOne({ _id: preferenceId, userId });
    if (!userPreference) {
      return res.status(404).json({ error: 'Preference not found' });
    }

    userPreference.languageName = newLanguage.languageName;
    userPreference.languageImage = newLanguage.languageImage;
    await userPreference.save();

    res.status(200).json({ message: 'Preference updated successfully', data: userPreference });
  } catch (error) {
    res.status(500).json({ error: `Server error: ${error.message}` });
  }
};

// Remove a language preference
const removeUserLanguagePreference = async (req, res) => {
  try {
    const userId = req.user._id;
    const { preferenceId } = req.params;

    if (!preferenceId) {
      return res.status(400).json({ error: 'Preference ID is required' });
    }

    const deletedPreference = await UserLanguagePreference.findOneAndDelete({ _id: preferenceId, userId });
    if (!deletedPreference) {
      return res.status(404).json({ error: 'Preference not found' });
    }

    res.status(200).json({ message: 'Preference removed successfully', data: deletedPreference });
  } catch (error) {
    res.status(500).json({ error: `Server error: ${error.message}` });
  }
};

// Get all user preferences
const getUserLanguagePreferences = async (req, res) => {
  try {
    const userId = req.user._id;

    const preferences = await UserLanguagePreference.find({ userId });
    res.status(200).json(preferences);
  } catch (error) {
    res.status(500).json({ error: `Server error: ${error.message}` });
  }
};

module.exports = {
  addUserLanguagePreference,
  updateUserLanguagePreference,
  removeUserLanguagePreference,
  getUserLanguagePreferences,
};
