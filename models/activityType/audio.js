const mongoose = require('mongoose');

const audioActivitySchema = new mongoose.Schema({
  type: {
    type: String,
    default: 'audio',
    immutable: true
  },
  language: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'PreferredLanguage', 
    required: true 
  },
  title: { 
    type: String, 
    required: true, 
    trim: true 
  },

  description: { 
    type: String, 
    required: true 
  },

  audio: { 
    type: String, 
    required: true 
  },
  duration: { 
    type: Number, 
    required: true },
  
  transcript: String,

  difficulty: { 
    type: String, 
    enum: ['beginner', 'intermediate', 'advanced'], 
    default: 'beginner' 
  },

  order: { 
    type: Number, 
    required: true 
  },

  completionCriteria: {
    listenPercentage: { type: Number, min: 0, max: 100, default: 90 }
  }
});

module.exports = mongoose.model('AudioActivity', audioActivitySchema);
