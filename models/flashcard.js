const mongoose = require('mongoose');

const flashcardActivitySchema = new mongoose.Schema({
  type: {
    type: String,
    default: 'flashcard',
    immutable: true
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

  cards: [{
    front: { type: String, required: true },
    back: { type: String, required: true },
    hint: String,
    example: String
  }],

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
    cardsReviewed: { type: Number, required: true },
    minimumCorrect: { type: Number, default: 80 }
  }
});

module.exports = mongoose.model('FlashcardActivity', flashcardActivitySchema);
