const express = require('express');
const router = express.Router();
const { 
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse
    } = require('../controller/course Controller');

router.get('/course', getAllCourses);
router.get('/course/:id', getCourseById);
router.post('/course', createCourse);
router.put('/course/:id', updateCourse);
router.delete('/course/:id', deleteCourse);

module.exports = router;