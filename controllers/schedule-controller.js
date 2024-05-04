const createError = require('http-errors');
const { hashPassword } = require("../helpers/password-crypt");
const ScheduleService = require("../services/schedule-service");

class ScheduleController {
    // user role
    static async getScheduleById(req, res, next) {
        try {
            const Schedule = await ScheduleService.getScheduleById(req.params.scheduleId);
            if (!Schedule) {
                return next(createError.BadRequest(`Không tìm được Schedule với id là ${req.params.scheduleId}`));

            }
            return res.status(200).json({
                status: 200,
                message: "done",
                data: Schedule
            })
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }
    static async getAllSchedule(req, res, next) {
        try {
            const Schedules = await ScheduleService.getAllSchedule();
            if (!Schedules) {
              
                return next(createError.BadRequest(`Không tìm được Schedule`));

            }
            return res.status(200).json({
                status: 200,
                message: "done",
                data: Schedules
            })
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }
    static async getAllScheduleByClassRoomId(req, res, next) {
        try {
            const Schedules = await ScheduleService.getAllScheduleByClassRoomId(req.params.classRoomId);
            if (!Schedules) {
              
                return next(createError.BadRequest(`Không tìm được Schedule`));

            }
            return res.status(200).json({
                status: 200,
                message: "done",
                data: Schedules
            })
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }
    static async createSchedule(req, res, next) {
        try {
            const Schedule = await ScheduleService.createSchedule(req.body);
            if (!Schedule) {
                return next(createError.InternalServerError());
            }
            return res.status(200).json({
                status: 200,
                message: "done",
                data: Schedule
            });
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }
    static async updateSchedule(req, res, next) {
        try {

            const { scheduleId, ...value } = req.body
            const Schedule = await ScheduleService.updateSchedule(scheduleId, value);
            if (!Schedule) {
                return next(createError.InternalServerError());
            }
            return res.status(200).json({
                status: 200,
                message: 'done',
                data: Schedule,

            })
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }
    static async deleteScheduleById(req, res, next) {
        try {
            console.log(req.params.scheduleId)
            const Schedule = await ScheduleService.deleteScheduleById(req.params.scheduleId);
            if (Schedule <= 0) {
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

module.exports = ScheduleController;
