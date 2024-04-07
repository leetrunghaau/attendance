
const { generateKey } = require('crypto');
const ScheduleUser = require('../models/class-room-user-model');
const { generateId } = require('../helpers/generate-key');

class ScheduleUserService {
  static async getScheduleUserById(scheduleUserId) {
    return ScheduleUser.findByPk(scheduleUserId);
  }
  static async getAllScheduleUser() {
    return ScheduleUser.findAll();
  }
  static async createScheduleUser(scheduleUserData) {
    scheduleUserData.scheduleUserId = generateId()
    return ScheduleUser.create(scheduleUserData);

  }

  static async updateScheduleUser(scheduleUserId, scheduleUserData) {
    await ScheduleUser.update(scheduleUserData, {
      where: { scheduleUserId: scheduleUserId },
    });
    return this.getScheduleUserById(scheduleUserId);
  }

  static async deleteScheduleUserById(scheduleUserId) {
    return ScheduleUser.destroy({
      where: { scheduleUserId: scheduleUserId },
    });
  }
}

module.exports = ScheduleUserService;
