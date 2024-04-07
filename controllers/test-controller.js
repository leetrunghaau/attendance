const createError = require('http-errors');
const { hashPassword } = require("../helpers/password-crypt");
const ClassRoomUserService = require('../services/class-room-user-service');
const DriverService = require('../services/driver-serive');
const UserService = require('../services/user-service');
const ScheduleService = require('../services/schedule-service');
const ClassRoomService = require('../services/class_room-service');
const AttendanceService = require('../services/attendance-service');
const ScheduleItemService = require('../services/schedule-item-service');
const LessonService = require('../services/lesson-service');


class TestController {

    static async testCT(req, res, next) {
        try {
            const e = await ClassRoomUserService.getAllClassRoomUser();
            const r = await DriverService.getAllDriver();
            const y = await UserService.getAllUser();
            const a = await ScheduleService.getAllSchedule();
            const f = await ClassRoomService.getAllClassRoom();
            const g = await AttendanceService.getAllAttendance();
            const b = await ScheduleItemService.getAllAttendanceItem();
            const h = await LessonService.getAllLesson();


            return res.status(200).json({
                status: 200,
                message: "done",
            })
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }


}

module.exports = TestController;
