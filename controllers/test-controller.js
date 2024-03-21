const createError = require('http-errors');
const { hashPassword } = require("../helpers/password-crypt");
const ScheduleUserService = require('../services/schedule-user-service');
const DriverService = require('../services/driver-serive');
const SessionService = require('../services/serison-service');
const UserService = require('../services/user-service');
const ScheduleService = require('../services/schedule-service');
const RoomService = require('../services/room-service');


class TestController {

    static async testCT(req, res, next) {
        try {
            const e = await ScheduleUserService.getAllCourseUser();
            const r = await DriverService.getAllDriver();
            const t = await SessionService.getAllSession();
            const y = await UserService.getAllUser();
            const a = await ScheduleService.getAllSchedule();
            const f = await RoomService.getAllRoom();
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
