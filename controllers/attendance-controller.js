const createError = require('http-errors');
const { hashPassword } = require("../helpers/password-crypt");
const DriverService = require("../services/driver-serive");

class AttendanceController {
    // user role
    static async checkIn(req, res, next) {
        try {
            const driver = await DriverService.getDriverById(req.body.driverId);
            if (!driver) {
                return next(createError.BadRequest(`Không tìm được Driver với id là ${req.body.driverId}`));
            }
            return res.status(200).json({
                status: 200,
                message: "done",
                data: driver
            })
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }
   
}

module.exports = AttendanceController;
