
const { generateKey } = require('crypto');
const Room = require('../models/room-model');
const { generateId } = require('../helpers/generate-key');

class RoomService {
  static async getRoomById(roomId) {
    return Room.findByPk(roomId);
  }
  static async getAllRoom() {
    return Room.findAll();
  }
  static async createRoom(roomData) {
    roomData.roomId = generateId()
    return Room.create(roomData);
  }

  static async updateRoom(roomId, roomData) {
    await Room.update(roomData, {
      where: { roomId: roomId },
    });
    return this.getRoomById(roomId);
  }

  static async deleteRoomById(roomId) {
    return Room.destroy({
      where: { roomId: roomId },
    });
  }
}

module.exports = RoomService;
