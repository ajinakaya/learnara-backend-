const UserProgress = require('../../models/progress/userprogress');

// Update User Progress
const updateUserProgress = async (req, res) => {
  try {
    const { courseId, chapterId, subLessonsCompletion, recentActivity, studyTime } = req.body;

    if (!courseId || !subLessonsCompletion || subLessonsCompletion.length === 0) {
      return res.status(400).json({ message: 'Course ID and subLessonsCompletion are required.' });
    }

    const userId = req.user._id;

    // Calculate completion percentage
    const totalSubLessons = subLessonsCompletion.length;
    const completedSubLessons = subLessonsCompletion.filter(
      (subLesson) => subLesson.completionStatus === 'Completed'
    ).length;

    const completionPercentage = ((completedSubLessons / totalSubLessons) * 100).toFixed(2);

    // Fetch existing user progress
    const userProgress = await UserProgress.findOne({ user: userId, course: courseId });

    // Streak Days Calculation
    const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
    let streakDays = userProgress?.streakDays || 0;
    const lastActivityDate = userProgress?.lastActivityDate || null;

    if (lastActivityDate) {
      const lastDate = new Date(lastActivityDate).toISOString().split('T')[0];
      const difference = (new Date(today) - new Date(lastDate)) / (1000 * 60 * 60 * 24); // Difference in days

      if (difference === 1) {
        streakDays += 1; // Increment streak
      } else if (difference > 1) {
        streakDays = 1; // Reset streak
      }
    } else {
      streakDays = 1; // First activity
    }

    // Total Study Time
    const totalStudyTime = (userProgress?.totalStudyTime || 0) + (studyTime || 0);

    // Update Recent Activities
    const updatedRecentActivities = userProgress?.recentActivities || [];
    if (recentActivity) {
      updatedRecentActivities.unshift({
        activityId: recentActivity.activityId,
        activityType: recentActivity.activityType,
        title: recentActivity.title,
        completedAt: new Date(),
        score: recentActivity.score,
        progress: recentActivity.progress
      });

      // Limit recent activities to the last 5
      if (updatedRecentActivities.length > 5) {
        updatedRecentActivities.pop();
      }
    }

    // Weekly Progress
    const weeklyProgress = userProgress?.weeklyProgress || {
      Monday: false,
      Tuesday: false,
      Wednesday: false,
      Thursday: false,
      Friday: false,
      Saturday: false,
      Sunday: false
    };
    const dayOfWeek = new Date().toLocaleString('en-US', { weekday: 'long', timeZone: 'UTC' });
    weeklyProgress[dayOfWeek] = true;

    // Update or create user progress
    const updatedProgress = await UserProgress.findOneAndUpdate(
      { user: userId, course: courseId },
      {
        chapter: chapterId || userProgress?.chapter || null,
        subLessonsCompletion: subLessonsCompletion,
        completionPercentage,
        totalStudyTime,
        streakDays,
        lastActivityDate: today,
        recentActivities: updatedRecentActivities,
        weeklyProgress
      },
      { new: true, upsert: true }
    );

    return res.status(200).json({
      message: 'User progress updated successfully.',
      updatedProgress
    });
  } catch (error) {
    console.error('Error updating user progress:', error);
    return res.status(500).json({ message: 'Error updating user progress.', error });
  }
};

// Get User Progress
const getUserProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user._id;

    const userProgress = await UserProgress.findOne({ user: userId, course: courseId })
      .populate('user', 'username email')
      .populate('course', 'title')
      .populate('subLessonsCompletion.subLesson', 'title')
      .populate('recentActivities.activityId');

    if (!userProgress) {
      return res.status(404).json({ message: 'User progress not found.' });
    }

    return res.status(200).json({ userProgress });
  } catch (error) {
    console.error('Error fetching user progress:', error);
    return res.status(500).json({ message: 'Error fetching user progress.', error });
  }
};

// Get Overall Completion for a Course
const getCourseCompletionPercentage = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user._id;

    const userProgress = await UserProgress.findOne({ user: userId, course: courseId });

    if (!userProgress) {
      return res.status(404).json({ message: 'User progress not found.' });
    }

    return res.status(200).json({
      completionPercentage: userProgress.completionPercentage
    });
  } catch (error) {
    console.error('Error fetching course completion percentage:', error);
    return res.status(500).json({ message: 'Error fetching course completion percentage.', error });
  }
};

module.exports = {
  updateUserProgress,
  getUserProgress,
  getCourseCompletionPercentage
};
