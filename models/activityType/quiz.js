const mongoose = require('mongoose');

const quizActivitySchema = new mongoose.Schema({
  type: {
    type: String,
    default: 'quiz',
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

  questions: [{
    question: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswer: { type: String, required: true },
    explanation: String
  }],

  duration: { 
    type: Number, 
    required: true 
  },
   // in minutes
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
    passingScore: { type: Number, min: 0, max: 100, default: 70 },
    attemptsAllowed: { type: Number, default: 3 }
  }
});

module.exports = mongoose.model('QuizActivity', quizActivitySchema);
