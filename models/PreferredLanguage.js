const mongoose = require('mongoose');

const preferredLanguageSchema = new mongoose.Schema({

  languageName: {
    type: String,
    required: true,
  },
  languageImage: {
    type: String, 
    required: true,
  },
});

module.exports = mongoose.model('PreferredLanguage', preferredLanguageSchema);
