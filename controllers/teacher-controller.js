const createError = require('http-errors');
const { hashPassword } = require("../helpers/password-crypt");
const TeacherService = require("../services/teacher-service");

class TeacherController {
    // user role
    static async getTeacherById(req, res, next) {
        try {
            const Teacher = await TeacherService.getTeacherById(req.params.teacherId);
            if (!Teacher) {
                return next(createError.BadRequest(`Không tìm được Teacher với id là ${req.params.teacherId}`));

            }
            return res.status(200).json({
                status: 200,
                message: "done",
                data: Teacher
            })
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }
    static async getAllTeacher(req, res, next) {
        try {
            const Teachers = await TeacherService.getAllTeacher();
            if (!Teachers) {
              
                return next(createError.BadRequest(`Không tìm được Teacher`));

            }
            return res.status(200).json({
                status: 200,
                message: "done",
                data: Teachers
            })
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }
    static async createTeacher(req, res, next) {
        try {
            const Teacher = await TeacherService.createTeacher(req.body);
            if (!Teacher) {
                return next(createError.InternalServerError());
            }
            return res.status(200).json({
                status: 200,
                message: "done",
                data: Teacher
            });
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }
    static async updateTeacher(req, res, next) {
        try {

            const { teacherId, ...value } = req.body
            const Teacher = await TeacherService.updateTeacher(teacherId, value);
            if (!Teacher) {
                return next(createError.InternalServerError());
            }
            return res.status(200).json({
                status: 200,
                message: 'done',
                data: Teacher,

            })
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }
    static async deleteTeacherById(req, res, next) {
        try {
            console.log(req.params.teacherId)
            const Teacher = await TeacherService.deleteTeacherById(req.params.teacherId);
            if (Teacher <= 0) {
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

module.exports = TeacherController;
