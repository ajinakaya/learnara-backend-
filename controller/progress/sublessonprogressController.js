const SubLessonProgress = require('../../models/progress/subLessonProgress');

// Get Current SubLesson
const getCurrentSubLesson = async (req, res) => {
  try {
    const { subLessonId } = req.params;
    const userId = req.user._id;

    const subLessonProgress = await SubLessonProgress.findOne({
      user: userId,
      subLesson: subLessonId,
    }).populate('subLesson', 'title description order');

    if (!subLessonProgress) {
      return res.status(404).json({ message: 'SubLesson progress not found.' });
    }

    return res.status(200).json({
      message: 'Current sublesson fetched successfully.',
      subLessonProgress,
    });
  } catch (error) {
    console.error('Error fetching current sublesson:', error);
    return res.status(500).json({ message: 'Error fetching current sublesson.', error });
  }
};

// Update SubLesson Progress
const updateSubLessonProgress = async (req, res) => {
  try {
    const { subLessonId, completionStatus, activities } = req.body;
    const userId = req.user._id;

   
    if (!['not_started', 'in_progress', 'completed'].includes(completionStatus)) {
      return res.status(400).json({ error: 'Invalid completion status.' });
    }

    const subLessonProgress = await SubLessonProgress.findOneAndUpdate(
      { user: userId, subLesson: subLessonId },
      {
        completionStatus,
        activities: activities || [],
        completionDate: completionStatus === 'completed' ? new Date() : null,
      },
      { new: true, upsert: true }
    ).populate('subLesson', 'title description order');

    res.status(200).json({
      message: 'SubLesson progress updated successfully.',
      subLessonProgress,
    });
  } catch (error) {
    console.error('Error updating sublesson progress:', error);
    res.status(500).json({ message: 'Error updating sublesson progress.', error });
  }
};

// Get All SubLesson Progress for a User
const getAllSubLessonProgress = async (req, res) => {
  try {
    const userId = req.user._id;

    const subLessonProgress = await SubLessonProgress.find({
      user: userId,
    })
      .populate('subLesson', 'title description order')
      .populate('activities', 'activityType score progress');

    if (subLessonProgress.length === 0) {
      return res.status(404).json({ message: 'No sublesson progress found.' });
    }

    res.status(200).json({
      message: 'Sublesson progress fetched successfully.',
      subLessonProgress,
    });
  } catch (error) {
    console.error('Error fetching sublesson progress:', error);
    res.status(500).json({ message: 'Error fetching sublesson progress.', error });
  }
};

module.exports = {
  getCurrentSubLesson,
  updateSubLessonProgress,
  getAllSubLessonProgress,
};
