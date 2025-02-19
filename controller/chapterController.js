const Chapter = require('../models/chapter');

// Get all chapters 
const getAllChapters = async (req, res) => {
  try {
    const chapters = await Chapter.find().populate('subLessons prerequisites language');
    res.status(200).json(chapters);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching chapters', error: err });
  }
};

// Get a single chapter 
const getChapterById = async (req, res) => {
  try {
    const chapter = await Chapter.findById(req.params.id).populate('subLessons prerequisites language');
    if (!chapter) {
      return res.status(404).json({ message: 'Chapter not found' });
    }
    res.status(200).json(chapter);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching chapter', error: err });
  }
};

// Create a new chapter
const createChapter = async (req, res) => {
   try {
      const newChapter = await Chapter.create(req.body);
      res.status(201).json(newChapter);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  

// Update an existing chapter
const updateChapter = async (req, res) => {
  try {
    const chapter = await Chapter.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('subLessons prerequisites language');
    if (!chapter) {
      return res.status(404).json({ message: 'Chapter not found' });
    }
    res.status(200).json(chapter);
  } catch (err) {
    res.status(500).json({ message: 'Error updating chapter', error: err });
  }
};

// Delete a chapter 
const deleteChapter = async (req, res) => {
  try {
    const chapter = await Chapter.findByIdAndDelete(req.params.id);
    if (!chapter) {
      return res.status(404).json({ message: 'Chapter not found' });
    }
    res.status(200).json({ message: 'Chapter deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting chapter', error: err });
  }
};

module.exports = {
  getAllChapters,
  getChapterById,
  createChapter,
  updateChapter,
  deleteChapter,
};

