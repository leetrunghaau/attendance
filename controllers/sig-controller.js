const { date } = require("joi");
const { generateId, accessTokenSecret, generateCode } = require("../helpers/generate-key");
const { generateAccessToken, generateVerificationToken } = require("../helpers/jwt");
const { hashPassword, comparePasswords } = require("../helpers/password-crypt");
const AccountService = require("../services/account-service");
const UserService = require("../services/user-service");
const createError = require('http-errors');
const StudentService = require("../services/student-service");

class SigController {
    static async staffLoginEmail(req, res, next) {
        try {
            const userData = await UserService.getUserByEmail(req.body.email);
            if (!userData) {
                return next(createError.NotFound('user not found'));
            }
            let accountData = await AccountService.getAccountByUserId(userData.userId);
            if (!accountData) {
                return next(createError.NotFound('account not found'));
            }
            const checkValue = await comparePasswords(req.body.password, accountData.password);
            if (checkValue == false) {
                return next(createError.BadRequest('password not mach'));
            }
            const token = await generateAccessToken(userData.userId, accountData.role);
            return res.status(200).json({
                status: 200,
                message: 'login done',
                data: {
                    role: userData.role,
                    token: ' ' + token
                }
            });

        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    };
    static async staffLoginId(req, res, next) {
        try {
            const userData = await UserService.getUserById(req.body.userId);
            if (!userData) {
                return next(createError.NotFound('user not found'));
            }
            let accountData = await AccountService.getAccountByUserId(userData.userId);
            if (!accountData) {
                return next(createError.NotFound('account not found'));
            }
            const checkValue = await comparePasswords(req.body.password, accountData.password);
            if (checkValue == false) {
                return next(createError.BadRequest('password not mach'));
            }
            const token = await generateAccessToken(userData.userId, accountData.role);
            return res.status(200).json({
                status: 200,
                message: 'login done',
                data: {
                    role: userData.role,
                    token: ' ' + token
                }
            });

        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    };
    static async studentLogin(req, res, next) {
        try {
            const student = await StudentService.getStudentById(req.body.studentId);
            if (!student) {
                return next(createError.NotFound('student not found'));
            }
            let accountData = await AccountService.getAccountByStudentId(student.studentId);
            if (!accountData) {
                accountData = {
                    studentId: req.body.studentId,
                    password: await hashPassword(req.body.studentId),
                    role: "student"
                }
                const account = await AccountService.createAccount(accountData);
                if (!account) {
                    return next(createError.InternalServerError());

                }
            } else {
                const checkValue = await comparePasswords(req.body.password, accountData.password);
                if (checkValue == false) {
                    return next(createError.BadRequest('password not mach'));
                }
            }

            const token = await generateAccessToken(student.studentId, accountData.role);
            return res.status(200).json({
                status: 200,
                message: 'login done',
                data: {
                    role: student.role,
                    token: ' ' + token
                }
                
            });

        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    };


}
module.exports = SigController;