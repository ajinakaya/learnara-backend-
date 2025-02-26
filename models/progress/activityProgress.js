const mongoose = require('mongoose');

const activityProgressSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    activityId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'activityType'
    },
    activityType: {
      type: String,
      required: true,
      enum: ['VideoActivity', 'AudioActivity', 'QuizActivity', 'FlashcardActivity']
    },
    status: {
      type: String,
      enum: ['not_started', 'in_progress', 'completed'],
      default: 'not_started'
    },
    progress: {
      type: Number,  // Percentage completion (0-100)
      default: 0
    },
    score: Number,   // For quizzes and assessments
    timeSpent: Number, // Time spent in minutes
    lastAccessed: {
      type: Date,
      default: Date.now
    },
    completedAt: Date,
    metadata: {     
      correctAnswers: Number,       // For quizzes
      totalQuestions: Number,       // For quizzes
      flashcardsReviewed: Number,   // For flashcards
      speakingExercisesDone: Number // For speaking exercises
    }
  });
  
  module.exports = mongoose.model('activityProgress', activityProgressSchema);