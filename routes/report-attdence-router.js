const express = require('express');
const router = express.Router();
const ReportAttendenceController = require('../controllers/report-attendence');

// Define routes
router.post("/reportAttendenceStudent", ReportAttendenceController.reportAttendenceStudent);
router.post("/reportAttendenceTeacher", ReportAttendenceController.reportAttendenceTeacher);
module.exports = router;
