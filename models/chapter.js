const mongoose = require('mongoose');


const chapterSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true, 
    trim: true },

  description: String,
  
  order: { 
    type: Number, 
    required: true
  },
  subLessons: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'SubLesson' 
  }],

  prerequisites: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Chapter' 
  }],

  learningObjectives: [String],

  estimatedDuration: Number,
  
  status: { 
    type: String, 
    enum: ['draft', 'published'], 
    default: 'draft' 
  }
});

module.exports = mongoose.model('Chapter', chapterSchema);
