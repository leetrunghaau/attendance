
const { generateKey } = require('crypto');
const Schedule = require('../models/schedule_model');
const { generateId } = require('../helpers/generate-key');

class ScheduleService {
  static async getScheduleById(scheduleId) {
    return Schedule.findByPk(scheduleId);
  }
  static async getAllSchedule() {
    return Schedule.findAll();
  }
  static async createSchedule(scheduleData) {
    scheduleData.scheduleId = generateId()
    return Schedule.create(scheduleData);
  }

  static async updateSchedule(scheduleId, scheduleData) {
    await Schedule.update(scheduleData, {
      where: { scheduleId: scheduleId },
    });
    return this.getScheduleById(scheduleId);
  }

  static async deleteScheduleById(scheduleId) {
    return Schedule.destroy({
      where: { scheduleId: scheduleId },
    });
  }
}

module.exports = ScheduleService;
