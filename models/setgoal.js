const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  goal: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  levels: {
    type: [
      {
        level: {
          type: String,
          required: true,
          enum: ['A1', 'A2', 'B1', 'B2'],
        },
        description: {
          type: String,
          required: true,
        },
      },
    ],
    required: true,
  },
});

module.exports = mongoose.model('Goal', goalSchema);
