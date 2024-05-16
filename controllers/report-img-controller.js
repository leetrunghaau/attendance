const createError = require('http-errors');
const { hashPassword } = require("../helpers/password-crypt");
const DriverService = require("../services/driver-service");
const multer = require('multer');
const ImgLinkService = require('../services/img-link-service');
const moment = require('moment');
const ClassRoomService = require('../services/class-room-service');




class ReportImgController {
    // user role

    static async uploadImg(req, res, next) {
        try {

            const driver = await DriverService.getDriverById(req.body.driverId)
            if (!driver) {
                return next(createError.BadRequest("không tìm thấy driver"))
            }
            let updateParam = {
                linkValue: req.body.linkValue,
                imgStatus: req.body.imgStatus,
                imgTime: moment().utcOffset('+07:00'),
                classRoomId: driver.classRoomId ?? null
            };
            const img_link = await ImgLinkService.createImgLink(updateParam);
            if (!img_link) {
                return next(createError.InternalServerError("không up được data"))
            }
            return res.status(200).json({
                status: 200,
                message: "done",
                data: img_link
            })
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError(error));
        }
    }
    static async getAllImgLink(req, res, next) {
        try {
            let img_link = null;
            if (req.params.classRoomId == "ALL") {
                img_link = await ImgLinkService.getAllImgLink();
            } else {
                img_link = await ImgLinkService.getAllImgLinkByClassRoomId(req.params.classRoomId);
            }
            if (!img_link) {
                return next(createError.InternalServerError());
            }
            img_link.sort((a, b) => {
                return (a.imgTime) - (b.imgTime);
            });
            return res.status(200).json({
                status: 200,
                message: "done",
                data: img_link
            })
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }

}

module.exports = ReportImgController;
