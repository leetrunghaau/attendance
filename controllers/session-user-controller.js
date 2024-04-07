const createError = require('http-errors');
const { hashPassword } = require("../helpers/password-crypt");
const SessionUserService = require("../services/session-user-service");

class SessionUserController {
    // user role
    static async getSessionUserById(req, res, next) {
        try {
            const SessionUser = await SessionUserService.getSessionUserById(req.params.sessionUserId);
            if (!SessionUser) {
               
                return next(createError.BadRequest(`Không tìm được SessionUser với id là ${req.params.sessionUserId}`));

            }
            return res.status(200).json({
                status: 200,
                message: "done",
                data: SessionUser
            })
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }
    static async getAllSessionUser(req, res, next) {
        try {
            const SessionUsers = await SessionUserService.getAllSessionUser();
            if (!SessionUsers) {
                
                return next(createError.BadRequest(`Không tìm được SessionUser`));

            }
            return res.status(200).json({
                status: 200,
                message: "done",
                data: SessionUsers
            })
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }
    static async createSessionUser(req, res, next) {
        try {
            const SessionUser = await SessionUserService.createSessionUser(req.body);
            if (!SessionUser) {
                return next(createError.InternalServerError());
            }
            return res.status(200).json({
                status: 200,
                message: "done",
                data: SessionUser
            });
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }
    static async updateSessionUser(req, res, next) {
        try {

            const { sessionUserId, ...value } = req.body
            const SessionUser = await SessionUserService.updateSessionUser(sessionUserId, value);
            if (!SessionUser) {
                return next(createError.InternalServerError());
            }
            return res.status(200).json({
                status: 200,
                message: 'done',
                data: SessionUser,

            })
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }
    static async deleteSessionUserById(req, res, next) {
        try {
            console.log(req.params.sessionUserId)
            const SessionUser = await SessionUserService.deleteSessionUserById(req.params.sessionUserId);
            if (SessionUser <= 0) {
                return next(createError.InternalServerError());
            }
            return res.status(200).json({
                status: 200,
                message: 'done',
                data: SessionUser
            })
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }

}

module.exports = SessionUserController;
