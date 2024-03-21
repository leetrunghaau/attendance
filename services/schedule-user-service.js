
const { generateKey } = require('crypto');
const ScheduleUser = require('../models/schdule-user-model');
const { generateId } = require('../helpers/generate-key');

class ScheduleUserService {
  static async getCourseUserById(schduleUserId) {
    return ScheduleUser.findByPk(schduleUserId);
  }
  static async getAllCourseUser() {
    return CourseUser.findAll();
  }
  static async createCourseUser(schduleUserData) {
    schduleUserData.schduleUserId = generateId()
    return ScheduleUser.create(schduleUserData);
  }

  static async updateCourseUser(schduleUserId, schduleUserData) {
    await ScheduleUser.update(schduleUserData, {
      where: { schduleUserId: schduleUserId },
    });
    return this.getCourseUserById(schduleUserId);
  }

  static async deleteScheduleUserById(schduleUserId) {
    return ScheduleUser.destroy({
      where: { schduleUserId: schduleUserId },
    });
  }
}

module.exports = ScheduleUserService;
