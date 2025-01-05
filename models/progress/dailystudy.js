const dailyStudySchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    totalTimeSpent: Number,  
    activitiesCompleted: Number,
    streak: Number,
    activities: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ActivityProgress'
    }]
  });