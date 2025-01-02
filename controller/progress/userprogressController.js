const UserProgress = require('../../models/progress/userprogress');

// Update User Progress
const updateUserProgress = async (req, res) => {
  try {
    const { courseId, chapterId, subLessonsCompletion } = req.body;

    // Validate inputs
    if (!courseId || !subLessonsCompletion || subLessonsCompletion.length === 0) {
      return res.status(400).json({ message: 'Course ID and subLessonsCompletion are required.' });
    }

    const userId = req.user._id;

    // Calculate the completion percentage
    const totalSubLessons = subLessonsCompletion.length;
    const completedSubLessons = subLessonsCompletion.filter(
      (subLesson) => subLesson.completionStatus === 'Completed'
    ).length;

    const completionPercentage = (completedSubLessons / totalSubLessons) * 100;

    // Find or create UserProgress entry
    const userProgress = await UserProgress.findOneAndUpdate(
      { user: userId, course: courseId },
      {
        chapter: chapterId || null,
        subLessonsCompletion: subLessonsCompletion,
        completionPercentage: completionPercentage,
      },
      { new: true, upsert: true }
    );

    return res.status(200).json({
      message: 'User progress updated successfully.',
      userProgress,
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
      .populate('subLessonsCompletion.subLesson', 'title'); 

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
      completionPercentage: userProgress.completionPercentage,
    });
  } catch (error) {
    console.error('Error fetching course completion percentage:', error);
    return res.status(500).json({ message: 'Error fetching course completion percentage.', error });
  }
};

// Get Current SubLesson
const getCurrentSubLesson = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user._id; // Authenticated user ID

    const userProgress = await UserProgress.findOne({ user: userId, course: courseId })
      .populate('subLessonsCompletion.subLesson', 'title description order'); 

    if (!userProgress) {
      return res.status(404).json({ message: 'User progress not found.' });
    }

    // Find the current sublesson
    const currentSubLesson = userProgress.subLessonsCompletion.find(
      (subLesson) =>
        subLesson.completionStatus === 'In Progress' ||
        subLesson.completionStatus === 'Not Started'
    );

    if (!currentSubLesson) {
      return res.status(200).json({ message: 'All lessons are completed!', currentSubLesson: null });
    }

    return res.status(200).json({
      message: 'Current sublesson fetched successfully.',
      currentSubLesson,
    });
  } catch (error) {
    console.error('Error fetching current sublesson:', error);
    return res.status(500).json({ message: 'Error fetching current sublesson.', error });
  }
};

module.exports = {
  updateUserProgress,
  getUserProgress,
  getCourseCompletionPercentage,
  getCurrentSubLesson,
};
