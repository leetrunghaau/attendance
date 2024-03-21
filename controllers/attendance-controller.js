const createError = require('http-errors');
const { hashPassword } = require("../helpers/password-crypt");
const DriverService = require("../services/driver-serive");

class AttendanceController {
    // user role
    static async getDriverById(req, res, next) {
        try {
            const driver = await DriverService.getDriverById(req.params.driverId);
            if (!driver) {
                return res.status(200).json({
                    status: 204,
                    message: `Không tìm được Driver với id là ${req.params.driverId}`,
                    data: null
                })
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
