const createError = require('http-errors');
const { hashPassword } = require("../helpers/password-crypt");
const CourseUserService = require("../services/schedule-user-service");

class CourseUserController {
    // user role
    static async getCourseUserById(req, res, next) {
        try {
            const courseUser = await CourseUserService.getCourseUserById(req.params.courseUserId);
            if (!courseUser) {
                return res.status(200).json({
                    status: 204,
                    message: `Không tìm được CourseUser với id là ${req.params.courseUserId}`,
                    data: null
                })
            }
            return res.status(200).json({
                status: 200,
                message: "done",
                data: courseUser
            })
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }
    static async getAllCourseUser(req, res, next) {
        try {
            const courseUsers = await CourseUserService.getAllCourseUser();
            if (!courseUsers) {
                return res.status(204).json({
                    status: 204,
                    message: `Không tìm được CourseUser`,
                    data: null
                })
            }
            return res.status(200).json({
                status: 200,
                message: "done",
                data: courseUsers
            })
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }
    static async createCourseUser(req, res, next) {
        try {
            const courseUser = await CourseUserService.createCourseUser(req.body);
            if (!courseUser) {
                return next(createError.InternalServerError());
            }
            return res.status(200).json({
                status: 200,
                message: "done",
                data: courseUser
            });
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }
    static async updateCourseUser(req, res, next) {
        try {

            const { courseUserId, ...value } = req.body
            const courseUser = await CourseUserService.updateCourseUser(courseUserId, value);
            if (!courseUser) {
                return next(createError.InternalServerError());
            }
            return res.status(200).json({
                status: 200,
                message: 'done',
                data: courseUser,

            })
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }
    static async deleteCourseUserById(req, res, next) {
        try {
            console.log(req.params.courseUserId)
            const courseUser = await CourseUserService.deleteCourseUserById(req.params.courseUserId);
            if (courseUser <= 0) {
                return next(createError.InternalServerError());
            }
            return res.status(200).json({
                status: 200,
                message: 'done',
                data: courseUser
            })
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }

}

module.exports = CourseUserController;
