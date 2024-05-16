const express = require('express');
const router = express.Router();
const ReportImgController = require('../controllers/report-img-controller');
// Define routes
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: 'public/uploads/',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const originalName = file.originalname;
    const extension = path.extname(originalName);
    const fileName = uniqueSuffix + extension;
    cb(null, fileName);
    console.log(fileName);
  }
});
const upload = multer({ storage });

router.post("/uploadImg", ReportImgController.uploadImg);
// router.post("/upload",upload.single('image'), ReportImgController.upload);
router.get("/imgLinks/:classRoomId", ReportImgController.getAllImgLink);
module.exports = router;
