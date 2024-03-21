const createError = require('http-errors');
const { hashPassword } = require("../helpers/password-crypt");
const RoomService = require("../services/room-service");

class RoomController {
    // user role
    static async getRoomById(req, res, next) {
        try {
            const room = await RoomService.getRoomById(req.params.roomId);
            if (!room) {
                return res.status(200).json({
                    status: 204,
                    message: `Không tìm được Room với id là ${req.params.roomId}`,
                    data: null
                })
            }
            return res.status(200).json({
                status: 200,
                message: "done",
                data: room
            })
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }
    static async getAllRoom(req, res, next) {
        try {
            const rooms = await RoomService.getAllRoom();
            if (!rooms) {
                return res.status(204).json({
                    status: 204,
                    message: `Không tìm được Room`,
                    data: null
                })
            }
            return res.status(200).json({
                status: 200,
                message: "done",
                data: rooms
            })
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }
    static async createRoom(req, res, next) {
        try {
            const room = await RoomService.createRoom(req.body);
            if (!room) {
                return next(createError.InternalServerError());
            }
            return res.status(200).json({
                status: 200,
                message: "done",
                data: room
            });
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }
    static async updateRoom(req, res, next) {
        try {

            const { roomId, ...value } = req.body
            const room = await RoomService.updateRoom(roomId, value);
            if (!room) {
                return next(createError.InternalServerError());
            }
            return res.status(200).json({
                status: 200,
                message: 'done',
                data: room,

            })
        } catch (error) {
            console.log(error);
            return next(createError.InternalServerError());
        }
    }
    static async deleteRoomById(req, res, next) {
        try {
            console.log(req.params.roomId)
            const room = await RoomService.deleteRoomById(req.params.roomId);
            if (room <= 0) {
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

module.exports = RoomController;
