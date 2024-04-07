const createError = require('http-errors');
const { hashPassword } = require("../helpers/password-crypt");
const UserService = require("../services/user-service");

class UserController {
    // user role
    static async getUserById(req, res, next) {
        try {
            const user = await UserService.getUserById(req.params.userId);
            if (!user) {
                
                return next(createError.BadRequest(`Không tìm được User với id là ${req.params.userId}`));

            }
            return res.status(200).json({
                status: 200,
                message: "done",
                data: user
            })
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }
    static async getAllUser(req, res, next) {
        try {
            const users = await UserService.getAllUser();
            if (!users) {
                
                return next(createError.BadRequest(`Không tìm được User`));

            }
            return res.status(200).json({
                status: 200,
                message: "done",
                data: users
            })
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }
    static async createUser(req, res, next) {
        try {
            const user = await UserService.createUser(req.body);
            if (!user) {
                return next(createError.InternalServerError());
            }
            return res.status(200).json({
                status: 200,
                message: "done",
                data: user
            });
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }
    static async updateUser(req, res, next) {
        try {

            const { userId, ...value } = req.body
            const user = await UserService.updateUser(userId, value);
            if (!user) {
                return next(createError.InternalServerError());
            }
            return res.status(200).json({
                status: 200,
                message: 'done',
                data: user,

            })
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }
    static async deleteUserById(req, res, next) {
        try {
            console.log(req.params.userId)
            const user = await UserService.deleteUserById(req.params.userId);
            if (user <= 0) {
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

module.exports = UserController;
