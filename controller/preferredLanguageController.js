const PreferredLanguage = require('../models/PreferredLanguage');

// Create or update preferred language
const setPreferredLanguage = async (req, res) => {
  const { userId } = req.user; 
  const { language } = req.body;

  if (!language) {
    return res.status(400).json({ error: 'Language is required' });
  }

  try {
    // Check if the preferred language already exists for this user
    const existingLanguage = await PreferredLanguage.findOne({ userId });

    if (existingLanguage) {
      // Update existing record
      existingLanguage.language = language;
      await existingLanguage.save();
      return res.status(200).json({ message: 'Preferred language updated', data: existingLanguage });
    }

    // Create new preferred language
    const newLanguage = new PreferredLanguage({ userId, language });
    await newLanguage.save();
    return res.status(201).json({ message: 'Preferred language set', data: newLanguage });
  } catch (error) {
    console.error('Error setting preferred language:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get preferred language
const getPreferredLanguage = async (req, res) => {
  const { userId } = req.user;

  try {
    const language = await PreferredLanguage.findOne({ userId });

    if (!language) {
      return res.status(404).json({ error: 'Preferred language not found' });
    }

    res.status(200).json({ data: language });
  } catch (error) {
    console.error('Error fetching preferred language:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete preferred language
const deletePreferredLanguage = async (req, res) => {
  const { userId } = req.user;

  try {
    const deletedLanguage = await PreferredLanguage.findOneAndDelete({ userId });

    if (!deletedLanguage) {
      return res.status(404).json({ error: 'Preferred language not found' });
    }

    res.status(200).json({ message: 'Preferred language deleted', data: deletedLanguage });
  } catch (error) {
    console.error('Error deleting preferred language:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  setPreferredLanguage,
  getPreferredLanguage,
  deletePreferredLanguage,
};
