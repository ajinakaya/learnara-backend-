const mongoose = require('mongoose');

const learningGoalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  goalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Goal',
    required: true,
  }, 
  days: {
    type: [String],
    enum: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    required: true,
  },

  duration: {
    type: Number,
    required: true,
    min: 1,
  },
  time: {
    type: String,
    required: true,
    match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
  },

createdAt: {
    type: Date,
    default: Date.now
}
});

module.exports = mongoose.model('LearningGoal', learningGoalSchema);
