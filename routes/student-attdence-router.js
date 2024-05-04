
const express = require('express');
const router = express.Router();
const StudentAttendenceController = require('../controllers/student-attendence-controller');

// Define routes
router.post("/studentAttendenceCheckin", StudentAttendenceController.studentAttendenceCheckIn);
router.post("/studentAttendenceCheckout", StudentAttendenceController.studentAttendenceCheckOut);
router.post("/test/studentAttendenceCheckin", StudentAttendenceController.studentAttendenceCheckInTest);
router.post("/test/studentAttendenceCheckout", StudentAttendenceController.studentAttendenceCheckOutTest);
module.exports = router;
