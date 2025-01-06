const ActivityProgress = require('../../models/progress/activityProgress');

// Get Activity Progress
const getActivityProgress = async (req, res) => {
  try {
    const { activityId } = req.params;
    const userId = req.user._id;

    const activityProgress = await ActivityProgress.findOne({
      userId,
      activityId
    });

    if (!activityProgress) {
      return res.status(404).json({ message: 'Activity progress not found.' });
    }

    res.status(200).json({
      message: 'Activity progress fetched successfully.',
      activityProgress
    });
  } catch (error) {
    console.error('Error fetching activity progress:', error);
    res.status(500).json({ message: 'Error fetching activity progress.', error });
  }
};

// Update Activity Progress
const updateActivityProgress = async (req, res) => {
  try {
    const { activityId, activityType, status, progress, score, timeSpent, metadata } = req.body;
    const userId = req.user._id;

    if (!activityId || !activityType || !status) {
      return res.status(400).json({ message: 'Activity ID, type, and status are required.' });
    }

    const updatedActivityProgress = await ActivityProgress.findOneAndUpdate(
      { userId, activityId },
      {
        activityType,
        status,
        progress: progress || 0,
        score: score || null,
        timeSpent: (timeSpent || 0) + (await ActivityProgress.findOne({ userId, activityId }))?.timeSpent || 0,
        lastAccessed: new Date(),
        completedAt: status === 'completed' ? new Date() : null,
        metadata: metadata || {}
      },
      { new: true, upsert: true }
    );

    res.status(200).json({
      message: 'Activity progress updated successfully.',
      updatedActivityProgress
    });
  } catch (error) {
    console.error('Error updating activity progress:', error);
    res.status(500).json({ message: 'Error updating activity progress.', error });
  }
};

// Get All Activities Progress
const getAllActivitiesProgress = async (req, res) => {
  try {
    const userId = req.user._id;

    const activitiesProgress = await ActivityProgress.find({ userId });

    res.status(200).json({
      message: 'All activities progress fetched successfully.',
      activitiesProgress
    });
  } catch (error) {
    console.error('Error fetching activities progress:', error);
    res.status(500).json({ message: 'Error fetching activities progress.', error });
  }
};

module.exports = {
  getActivityProgress,
  updateActivityProgress,
  getAllActivitiesProgress
};
