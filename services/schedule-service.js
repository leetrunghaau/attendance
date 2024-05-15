
const { generateKey } = require('crypto');
const Schedule = require('../models/schedule_model');
const { generateId, generateIndexId } = require('../helpers/generate-key');
const ClassRoom = require('../models/class-room-model');

class ScheduleService {
  static async getScheduleById(scheduleId) {
    return Schedule.findByPk(scheduleId, {include:[{model: ClassRoom}]});
  }
  static async getAllSchedule() {
    return Schedule.findAll();
  }
  static async getAllScheduleByClassRoomId(classRoomId) {
    return Schedule.findAll({ where: { classRoomId: classRoomId }, include: [{ model: ClassRoom }] });
  }
  static async createSchedule(scheduleData) {
    scheduleData.scheduleId = generateIndexId("TKB")
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
