const mongoose = require('mongoose');

const learningGoalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  daily: {
    type: Number,
    required: false,
    default: null,
  },
  weekly: {
    type: Number,
    required: false,
    default: null,
  },
});

module.exports = mongoose.model('LearningGoal', learningGoalSchema);
