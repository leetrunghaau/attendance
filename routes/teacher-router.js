const express = require('express');
const router = express.Router();
const TeacherController = require('../controllers/teacher-controller');
// const { noAuthMiddleware, authorization } = require('../middlewares/auth-middleware');

// Define routes
router.get("/teacher/:teacherId", TeacherController.getTeacherById);
router.get("/teachers", TeacherController.getAllTeacher);
router.post("/teacher", TeacherController.createTeacher);
router.put("/teacher", TeacherController.updateTeacher);
router.delete("/teacher/:teacherId", TeacherController.deleteTeacherById);
module.exports = router;
