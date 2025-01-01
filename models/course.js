const mongoose = require('mongoose');


const courseSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true, 
    trim: true },

  language: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'PreferredLanguage', 
    required: true 
  },

  level: [{ 
    type: String, 
    enum: ['A1', 'A2', 'B1', 'B2'], 
    required: true 
  }],

  description: { 
    type: String, 
    required: true 
  },

  thumbnail: String,

  chapters: [{
     type: mongoose.Schema.Types.ObjectId, 
     ref: 'Chapter' 
    }],

  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },

  premium: { 
    type: Boolean, 
    default: false 
  },

  price: {
    amount: Number,
    currency: { type: String, default: 'USD' }
  },

  category: { 
    type: String, 
    required: true, 
    enum: ['Beginner', 'Intermediate', 'Advanced'] 
  },

  tags: [String],

  status: { 
    type: String, 
    enum: ['draft', 'published', 'archived'], 
    default: 'draft' 
  },

  metadata: {
    totalDuration: Number,
    totalChapters: Number,
    totalSubLessons: Number,
    totalActivities: Number,
    averageRating: { type: Number, default: 0 }
  },

  createdAt: { 
    type: Date, 
    default: Date.now 
  },

  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
