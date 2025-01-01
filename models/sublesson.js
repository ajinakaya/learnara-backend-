const mongoose = require('mongoose');

const subLessonSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true, 
    trim: true 
  },

  description: String,

  order: { 
    type: Number, 
    required: true 
  },

  activities: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    refPath: 'activityType' 
  }],

  activityType: { 
    type: String, 
    required: true, 
    enum: ['VideoActivity', 'AudioActivity', 'QuizActivity', 'FlashcardActivity'] 
  },

  duration: Number,

  objectives: [String],

  status: { 
    type: String, 
    enum: ['draft', 'published'], 
    default: 'draft' 
  },
  
  completionCriteria: {
    requiredActivities: { type: Number, default: 0 },
    minimumScore: { type: Number, min: 0, max: 100, default: 70 }
  }
});

module.exports = mongoose.model('SubLesson', subLessonSchema);
