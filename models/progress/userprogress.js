const mongoose = require('mongoose');

const userProgressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true
    },
    chapter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chapter'
    },
    subLessonsCompletion: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubLessonProgress'
      }
    ],
    completionPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    totalStudyTime: {
      type: Number, 
      default: 0
    },
    streakDays: {
      type: Number,
      default: 0
    },
    weeklyProgress: {
      Monday: { type: Boolean, default: false },
      Tuesday: { type: Boolean, default: false },
      Wednesday: { type: Boolean, default: false },
      Thursday: { type: Boolean, default: false },
      Friday: { type: Boolean, default: false },
      Saturday: { type: Boolean, default: false },
      Sunday: { type: Boolean, default: false }
    },
    recentActivities: [
      {
        activityId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'ActivityProgress'
        },
        activityType: {
          type: String,
          enum: ['VideoActivity', 'AudioActivity', 'QuizActivity', 'FlashcardActivity']
        },
        title: String, 
        completedAt: Date,
        score: Number,
        progress: Number 
      }
    ]
    
  },
  { timestamps: true }
);

module.exports = mongoose.model('UserProgress', userProgressSchema);
