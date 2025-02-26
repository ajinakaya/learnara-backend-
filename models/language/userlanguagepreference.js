const mongoose = require('mongoose');

const UserLanguagePreferenceSchema = new mongoose.Schema({
  _id: { 
    type: String,  // Using String to match languageId type
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  languageName: {
    type: String,
    required: true,
  },
  languageImage: {
    type: String, 
    required: true,
  },
});

module.exports = mongoose.model('UserLanguagePreference', UserLanguagePreferenceSchema);
