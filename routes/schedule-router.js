const express = require('express');
const router = express.Router();
const ScheduleController = require('../controllers/schedule-controller');
// const { noAuthMiddleware, authorization } = require('../middlewares/auth-middleware');

// Define routes
router.get("/schedule/:scheduleId", ScheduleController.getScheduleById);
router.get("/schedules", ScheduleController.getAllSchedule);
router.get("/schedules/classRoomId/:classRoomId", ScheduleController.getAllScheduleByClassRoomId);
router.post("/schedule", ScheduleController.createSchedule);
router.put("/schedule", ScheduleController.updateSchedule);
router.delete("/schedule/:scheduleId", ScheduleController.deleteScheduleById);
module.exports = router;
