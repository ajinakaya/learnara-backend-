const mongoose = require('mongoose');

const videoActivitySchema = new mongoose.Schema({
  type: {
    type: String,
    default: 'video',
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
    trim: true },

  description: { 
    type: String, 
    required: true 
  },

  video: { 
    type: String, 
    required: true 
  },

  duration: { 
    type: Number, 
    required: true 
  }, 

  thumbnailUrl: String,
  transcription: String,

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
    watchPercentage: { 
      type: Number, 
      min: 0, 
      max: 100, 
      default: 90 
    }
  }
});

module.exports = mongoose.model('VideoActivity', videoActivitySchema);
