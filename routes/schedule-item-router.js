const express = require('express');
const router = express.Router();
const ScheduleItemController = require('../controllers/schedule-item-controller');
// const { noAuthMiddleware, authorization } = require('../middlewares/auth-middleware');

// Define routes
router.get("/scheduleItem/:scheduleItemId", ScheduleItemController.getScheduleItemById);
router.get("/scheduleItems/scheduleId/:scheduleId", ScheduleItemController.getAllScheduleItemByScheduleId);
router.get("/scheduleItems", ScheduleItemController.getAllScheduleItem);
router.post("/scheduleItem", ScheduleItemController.createScheduleItem);
router.put("/scheduleItem", ScheduleItemController.updateScheduleItem);
router.delete("/scheduleItem/:scheduleItemId", ScheduleItemController.deleteScheduleItemById);
module.exports = router;
