const createError = require('http-errors');
const { hashPassword } = require("../helpers/password-crypt");
const StudentService = require("../services/student-service");

class StudentController {
    // user role
    static async getStudentByClassRoomId(req, res, next) {
        try {
            let Student;
            if (req.params.classRoomId == "all") {

                Student = await StudentService.getAllStudent();
            } else {
                Student = await StudentService.getStudentByClassRoomId(req.params.classRoomId);
            }
            if (!Student) {
                return next(createError.BadRequest(`Không tìm được Student với id là ${req.params.classRoomId}`));

            }
            return res.status(200).json({
                status: 200,
                message: "done",
                data: Student
            })
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }
    static async getAllStudent(req, res, next) {
        try {
            const Students = await StudentService.getAllStudent();
            if (!Students) {

                return next(createError.BadRequest(`Không tìm được Student`));

            }
            return res.status(200).json({
                status: 200,
                message: "done",
                data: Students
            })
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }
    static async createStudent(req, res, next) {
        try {
            const Student = await StudentService.createStudent(req.body);
            if (!Student) {
                return next(createError.InternalServerError());
            }
            return res.status(200).json({
                status: 200,
                message: "done",
                data: Student
            });
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }
    static async updateStudent(req, res, next) {
        try {

            const { studentId, ...value } = req.body
            const Student = await StudentService.updateStudent(studentId, value);
            if (!Student) {
                return next(createError.InternalServerError());
            }
            return res.status(200).json({
                status: 200,
                message: 'done',
                data: Student,

            })
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }
    static async deleteStudentById(req, res, next) {
        try {
            console.log(req.params.studentId)
            const Student = await StudentService.deleteStudentById(req.params.studentId);
            if (Student <= 0) {
                return next(createError.InternalServerError());
            }
            return res.status(200).json({
                status: 200,
                message: 'done',
            })
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }

}

module.exports = StudentController;
