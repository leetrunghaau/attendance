
const express = require('express');
const router = express.Router();
const TeacherAttendenceController = require('../controllers/teacher-attendence-controller');

// Define routes
router.post("/teacherAttendenceCheckin", TeacherAttendenceController.teacherAttendenceCheckIn);
router.post("/teacherAttendenceCheckout", TeacherAttendenceController.teacherAttendenceCheckOut);
router.post("/test/teacherAttendenceCheckin", TeacherAttendenceController.teacherAttendenceCheckInTest);
router.post("/test/teacherAttendenceCheckout", TeacherAttendenceController.teacherAttendenceCheckOutTest);
module.exports = router;
