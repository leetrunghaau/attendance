const createError = require('http-errors');
const { hashPassword } = require("../helpers/password-crypt");
const TeacherService = require("../services/teacher-service");
const LessonService = require('../services/lesson-service');
const moment = require('moment');
const { subtractMinutes } = require('../helper/generate-key');


class TestController {
    // user role
    static async test(req, res, next) {
        try {
            const lesson =await LessonService.getLessonById("76aaa220666135fc14")
            const currentTime = req.body.currentTime
            return res.status(200).json({
                status: 200,
                message: "done",
                data: subtractMinutes(currentTime, lesson.timeStart),
                leson: lesson
            })
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }
}

module.exports = TestController;
