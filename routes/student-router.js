const express = require('express');
const router = express.Router();
const StudentController = require('../controllers/student-controller');
// const { noAuthMiddleware, authorization } = require('../middlewares/auth-middleware');

// Define routes
router.get("/students/classRoomId/:classRoomId", StudentController.getStudentByClassRoomId);
router.get("/student/:studentId", StudentController.getStudentById);
router.get("/students", StudentController.getAllStudent);
router.post("/student", StudentController.createStudent);
router.post("/students", StudentController.createStudents);
router.put("/student", StudentController.updateStudent);
router.delete("/student/:studentId", StudentController.deleteStudentById);
module.exports = router;
