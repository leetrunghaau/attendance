const createError = require('http-errors');
const { hashPassword } = require("../helpers/password-crypt");
const CourseService = require("../services/sourse-service");

class CourseController {
    // user role
    static async getCourseById(req, res, next) {
        try {
            const course = await CourseService.getCourseById(req.params.courseId);
            if (!course) {
                return res.status(200).json({
                    status: 204,
                    message: `Không tìm được Course với id là ${req.params.courseId}`,
                    data: null
                })
            }
            return res.status(200).json({
                status: 200,
                message: "done",
                data: course
            })
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }
    static async getAllCourse(req, res, next) {
        try {
            const courses = await CourseService.getAllCourse();
            if (!courses) {
                return res.status(204).json({
                    status: 204,
                    message: `Không tìm được Course`,
                    data: null
                })
            }
            return res.status(200).json({
                status: 200,
                message: "done",
                data: courses
            })
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }
    static async createCourse(req, res, next) {
        try {
            const course = await CourseService.createCourse(req.body);
            if (!course) {
                return next(createError.InternalServerError());
            }
            return res.status(200).json({
                status: 200,
                message: "done",
                data: course
            });
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }
    static async updateCourse(req, res, next) {
        try {

            const { courseId, ...value } = req.body
            const course = await CourseService.updateCourse(courseId, value);
            if (!course) {
                return next(createError.InternalServerError());
            }
            return res.status(200).json({
                status: 200,
                message: 'done',
                data: course,

            })
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }
    static async deleteCourseById(req, res, next) {
        try {
            console.log(req.params.courseId)
            const course = await CourseService.deleteCourseById(req.params.courseId);
            if (Course <= 0) {
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

module.exports = CourseController;
