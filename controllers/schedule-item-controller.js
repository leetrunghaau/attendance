const createError = require('http-errors');
const { hashPassword } = require("../helpers/password-crypt");
const ScheduleItemService = require("../services/schedule-item-service");
const LessonService = require("../services/lesson-service");

class ScheduleItemController {
    // user role
    static async getScheduleItemById(req, res, next) {
        try {
            const ScheduleItem = await ScheduleItemService.getScheduleItemById(req.params.scheduleItemId);
            if (!ScheduleItem) {
                return next(createError.BadRequest(`Không tìm được ScheduleItem với id là ${req.params.scheduleItemId}`));

            }
            return res.status(200).json({
                status: 200,
                message: "done",
                data: ScheduleItem
            })
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }
    static async getAllScheduleItem(req, res, next) {
        try {
            const ScheduleItems = await ScheduleItemService.getAllScheduleItem();
            if (!ScheduleItems) {

                return next(createError.BadRequest(`Không tìm được ScheduleItem`));

            }
            return res.status(200).json({
                status: 200,
                message: "done",
                data: ScheduleItems
            })
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }
    static async getAllScheduleItemByScheduleId(req, res, next) {
        try {
            const listLesson = await LessonService.getAllLesson();
            if (!listLesson) {
                return next(createError.InternalServerError("lỗi hệ thống"))
            }
            const ScheduleItems = await ScheduleItemService.getAllScheduleItemByScheduleId(req.params.scheduleId);
            if (!ScheduleItems) {

                return next(createError.BadRequest(`Không tìm được ScheduleItem`));

            }
            const listItem = listLesson.map(item => {
                const itemRs = {
                    lessonId: item.lessonId,
                    lessonName: item.lessonName,
                    timeStart: item.timeStart,
                    timeEnd: item.timeEnd,
                    listSchedule: ScheduleItems.filter((a)=> a.lessonId == item.lessonId)
                };

                return itemRs
            })
            return res.status(200).json({
                status: 200,
                message: "done",
                data: listItem
            })
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }
    
    static async createScheduleItem(req, res, next) {
        try {

            const ScheduleItem = await ScheduleItemService.createScheduleItem(req.body);
            if (!ScheduleItem) {
                return next(createError.InternalServerError());
            }
            return res.status(200).json({
                status: 200,
                message: "done",
                data: ScheduleItem
            });
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }
    static async updateScheduleItem(req, res, next) {
        try {

            const { scheduleItemId, ...value } = req.body
            const ScheduleItem = await ScheduleItemService.updateScheduleItem(scheduleItemId, value);
            if (!ScheduleItem) {
                return next(createError.InternalServerError());
            }
            return res.status(200).json({
                status: 200,
                message: 'done',
                data: ScheduleItem,

            })
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }
    static async deleteScheduleItemById(req, res, next) {
        try {
            console.log(req.params.scheduleItemId)
            const ScheduleItem = await ScheduleItemService.deleteScheduleItemById(req.params.scheduleItemId);
            if (ScheduleItem <= 0) {
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

module.exports = ScheduleItemController;
