
const AudioActivity = require('../../models/activityType/audio');
const QuizActivity = require('../../models/activityType/quiz');
const FlashcardActivity = require('../../models/activityType/flashcard');
const VideoActivity = require('../../models/activityType/video');

// Get activities by type
const getActivitiesByType = async (req, res) => {
  try {
    const { type } = req.query; 

    let activities;

    switch (type) {
      case 'flashcard':
        activities = await FlashcardActivity.find().populate('language');
        break;
      case 'audio':
        activities = await AudioActivity.find().populate('language');
        break;
      case 'quiz':
        activities = await QuizActivity.find().populate('language');
        break;
      case 'video':
        activities = await VideoActivity.find().populate('language');
        break;
      default:
        return res.status(400).json({ message: 'Invalid activity type' });
    }

    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getActivitiesByType };
