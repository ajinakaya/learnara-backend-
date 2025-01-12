const DailyStudy = require('../../models/progress/dailystudy');

// Get Daily Study Data
const getDailyStudy = async (req, res) => {
  try {
    const { date } = req.params;
    const userId = req.user._id;

    const dailyStudy = await DailyStudy.findOne({
      userId,
      date: new Date(date).toISOString().split('T')[0] 
    }).populate('activities');

    if (!dailyStudy) {
      return res.status(404).json({ message: 'Daily study data not found.' });
    }

    res.status(200).json({
      message: 'Daily study data fetched successfully.',
      dailyStudy
    });
  } catch (error) {
    console.error('Error fetching daily study data:', error);
    res.status(500).json({ message: 'Error fetching daily study data.', error });
  }
};

// Update Daily Study Data
const updateDailyStudy = async (req, res) => {
  try {
    const { date, totalTimeSpent, activitiesCompleted, activities } = req.body;
    const userId = req.user._id;



    const currentDate = new Date(date).toISOString().split('T')[0];
    const existingDailyStudy = await DailyStudy.findOne({ userId, date: currentDate });

    const updatedDailyStudy = await DailyStudy.findOneAndUpdate(
      { userId, date: currentDate },
      {
        totalTimeSpent: (existingDailyStudy?.totalTimeSpent || 0) + totalTimeSpent,
        activitiesCompleted: (existingDailyStudy?.activitiesCompleted || 0) + activitiesCompleted,
        streak: (existingDailyStudy?.streak || 0) + 1,
        activities: [...new Set([...(existingDailyStudy?.activities || []), ...(activities || [])])]
      },
      { new: true, upsert: true }
    );

    res.status(200).json({
      message: 'Daily study data updated successfully.',
      updatedDailyStudy
    });
  } catch (error) {
    console.error('Error updating daily study data:', error);
    res.status(500).json({ message: 'Error updating daily study data.', error });
  }
};

// Get All Daily Study Data
const getAllDailyStudy = async (req, res) => {
  try {
    const userId = req.user._id;

    const dailyStudies = await DailyStudy.find({ userId }).populate('activities');

    res.status(200).json({
      message: 'All daily study data fetched successfully.',
      dailyStudies
    });
  } catch (error) {
    console.error('Error fetching daily study data:', error);
    res.status(500).json({ message: 'Error fetching daily study data.', error });
  }
};

module.exports = {
  getDailyStudy,
  updateDailyStudy,
  getAllDailyStudy
};
