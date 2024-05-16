const express = require('express');
const router = express.Router();
const ReportImgController = require('../controllers/report-img-controller');
// Define routes
router.post("/uploadImg", ReportImgController.uploadImg);
router.get("/imgLinks/:classRoomId", ReportImgController.getAllImgLink);
module.exports = router;
