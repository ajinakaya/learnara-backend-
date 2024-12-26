const PreferredLanguage = require('../models/PreferredLanguage');

// Add a new language
const addLanguage = async (req, res) => {
  try {
    const { languageName, languageImage } = req.body;

    // Validate input
    if (!languageName || !languageImage) {
      return res.status(400).json({ error: 'Name and flag image are required' });
    }

    const existingLanguage = await PreferredLanguage.findOne({ languageName });
    if (existingLanguage) {
      return res.status(400).json({ error: 'Language already exists' });
    }

    const language = await PreferredLanguage.create({ languageName, languageImage });
    res.status(201).json(language);
  } catch (error) {
    res.status(500).json({ error: `Server error: ${error.message}` });
  }
};

// Update a language
const updateLanguage = async (req, res) => {
  try {
    const { languageId } = req.params;
    const { languageName, languageImage } = req.body;

    if (!languageName && !languageImage) {
      return res.status(400).json({ error: 'At least one field (name or flagImage) must be provided to update' });
    }

    const language = await PreferredLanguage.findById(languageId);
    if (!language) {
      return res.status(404).json({ error: 'Language not found' });
    }

    if (languageName) language.languageName = languageName;
    if (languageImage) language.languageImage = languageImage;

    await language.save();
    res.status(200).json(language);
  } catch (error) {
    res.status(500).json({ error: `Server error: ${error.message}` });
  }
};

// Delete a language
const deleteLanguage = async (req, res) => {
  try {
    const { languageId } = req.params;

    const deletedLanguage = await PreferredLanguage.findByIdAndDelete(languageId);
    if (!deletedLanguage) {
      return res.status(404).json({ error: 'Language not found' });
    }

    res.status(200).json({ message: 'Language deleted successfully', data: deletedLanguage });
  } catch (error) {
    res.status(500).json({ error: `Server error: ${error.message}` });
  }
};

// Get all languages
const getLanguages = async (req, res) => {
  try {
    const languages = await PreferredLanguage.find();
    res.status(200).json(languages);
  } catch (error) {
    res.status(500).json({ error: `Server error: ${error.message}` });
  }
};

module.exports = {
  addLanguage,
  updateLanguage,
  deleteLanguage,
  getLanguages,
};
