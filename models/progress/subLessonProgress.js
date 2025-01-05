const mongoose = require('mongoose');

const subLessonProgressSchema = new mongoose.Schema(
  {
    subLesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SubLesson',
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
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
    activities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ActivityProgress',
        required: true
      }
    ],
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('SubLessonProgress', subLessonProgressSchema);
