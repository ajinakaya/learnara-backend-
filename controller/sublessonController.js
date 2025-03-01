const SubLesson = require('../models/sublesson');

const createSubLesson = async (req, res) => {
  try {
    const subLesson = new SubLesson(req.body);
    const savedSubLesson = await subLesson.save();
    res.status(201).json(savedSubLesson);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllSubLessons = async (req, res) => {
  try {
   
    const { language } = req.query; 
    
    const query = language ? { language } : {};
    
    const subLessons = await SubLesson.find(query)
    .populate('language')
    .populate('activities');
    
    res.status(200).json(subLessons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSubLessonById = async (req, res) => {
  try {
    const subLesson = await SubLesson.findById(req.params.id)
      .populate('language')
      .populate('activities');

    if (!subLesson) return res.status(404).json({ error: "SubLesson not found" });

    res.status(200).json(subLesson);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateSubLesson = async (req, res) => {
  try {
    const updatedSubLesson = await SubLesson.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('language')
      .populate('activities');

    if (!updatedSubLesson) return res.status(404).json({ error: "SubLesson not found" });

    res.status(200).json(updatedSubLesson);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteSubLesson = async (req, res) => {
  try {
    const deletedSubLesson = await SubLesson.findByIdAndDelete(req.params.id);
    if (!deletedSubLesson) return res.status(404).json({ error: "SubLesson not found" });
    res.status(200).json({ message: "SubLesson deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createSubLesson,
  getAllSubLessons,
  getSubLessonById,
  updateSubLesson,
  deleteSubLesson
};
