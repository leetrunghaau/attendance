const createError = require('http-errors');
const { hashPassword } = require("../helpers/password-crypt");
const DriverService = require("../services/driver-service");

class DriverController {
    // user role
    static async getDriverById(req, res, next) {
        try {
            const driver = await DriverService.getDriverById(req.params.driverId);
            if (!driver) {
                return next(createError.BadRequest(`Không tìm được Driver với id là ${req.params.driverId}`));

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
    static async getAllDriver(req, res, next) {
        try {
            const drivers = await DriverService.getAllDriver();
            if (!drivers) {
              
                return next(createError.BadRequest(`Không tìm được Driver`));

            }
            return res.status(200).json({
                status: 200,
                message: "done",
                data: drivers
            })
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }
    static async createDriver(req, res, next) {
        try {
            const driver = await DriverService.createDriver(req.body);
            if (!driver) {
                return next(createError.InternalServerError());
            }
            return res.status(200).json({
                status: 200,
                message: "done",
                data: driver
            });
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }
    static async updateDriver(req, res, next) {
        try {

            const { driverId, ...value } = req.body
            const driver = await DriverService.updateDriver(driverId, value);
            if (!driver) {
                return next(createError.InternalServerError());
            }
            return res.status(200).json({
                status: 200,
                message: 'done',
                data: driver,

            })
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }
    static async deleteDriverById(req, res, next) {
        try {
            console.log(req.params.driverId)
            const driver = await DriverService.deleteDriverById(req.params.driverId);
            if (driver <= 0) {
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

module.exports = DriverController;
