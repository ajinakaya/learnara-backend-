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
        subLesson: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'SubLesson',
          required: true
        },
        completionStatus: {
          type: String,
          enum: ['not_started', 'in_progress', 'completed'],
          default: 'not_started'
        },
        completionDate: {
          type: Date,
          default: null 
        },
        updatedAt: {
          type: Date,
          default: Date.now 
        }
      }
    ],
    completionPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100 
    }
  },
  { timestamps: true } 
);

module.exports = mongoose.model('UserProgress', userProgressSchema);
