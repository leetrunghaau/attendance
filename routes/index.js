// index.js
const express = require('express');
const router = express.Router();

const driverRouter = require('./driver-router')
const classRoomRouter = require('./class-room-router')
const studentRouter = require('./student-router')
const lessonRouter = require('./lesson-router')
const teacherRouter = require('./teacher-router')
const scheduleRouter = require('./schedule-router')
const scheduleItemRouter = require('./schedule-item-router')
const studentAttendenceRouter = require('./student-attdence-router')
const teacherAttendenceRouter = require('./teacher-attdence-router')
const reportAttendenceRouter = require('./report-attdence-router')
const reportImgRouter = require('./report-img-router')
const testR = require('./test-router')



router.use(driverRouter);
router.use(classRoomRouter);
router.use(studentRouter);
router.use(lessonRouter);
router.use(teacherRouter);
router.use(scheduleRouter);
router.use(scheduleItemRouter);
router.use(studentAttendenceRouter);
router.use(teacherAttendenceRouter);
router.use(reportAttendenceRouter);
router.use(reportImgRouter);
router.use(testR);
module.exports = router;
