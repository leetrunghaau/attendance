const createError = require('http-errors');
const { hashPassword } = require("../helpers/password-crypt");
const LessonService = require("../services/lesson-service");

class LessonController {
    static async getAllLesson(req, res, next) {
        try {
            const Lessons = await LessonService.getAllLesson();
            
            if (!Lessons) {
              return next(createError.InternalServerError());
            }
            Lessons.sort((a, b) => {
                return (a.timeStart) - (b.timeStart);
            });
            return res.status(200).json({
                status: 200,
                message: "done",
                data: Lessons
            })
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }
    static async createLessons(req, res, next) {
        try {
            const Lessons = await LessonService.createMultipleLessons(req.body);
            if (!Lessons) {
                return next(createError.InternalServerError());
            }
            return res.status(200).json({
                status: 200,
                message: "done",
                data: Lessons
            });
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }

}

module.exports = LessonController;
