
const express = require('express');
const router = express.Router();
const LessonController = require('../controllers/lesson-controller');

// Define routes
router.get("/lessons", LessonController.getAllLesson);
router.post("/lessons", LessonController.createLessons);
module.exports = router;
