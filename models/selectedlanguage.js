const mongoose = require('mongoose');

const preferredLanguageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  language: {
    type: String,
    required: true,
    enum: ['English', 'Spanish', 'French', 'German', 'Mandarin', 'Japanese', 'Korean'], 
  },
});

module.exports = mongoose.model('PreferredLanguage', preferredLanguageSchema);
