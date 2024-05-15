
const { generateKey } = require('crypto');
const ScheduleItem = require('../models/schedule-item-model');
const { generateId, generateRandomString } = require('../helpers/generate-key');
const ClassRoom = require('../models/class-room-model');
const Lesson = require('../models/lesson-model');
const Teacher = require('../models/teacher-model');
const Schedule = require('../models/schedule_model');
const { Op } = require('sequelize');
const moment = require('moment');

class ScheduleItemService {
  static async getScheduleItemById(scheduleItemId) {
    return ScheduleItem.findByPk(scheduleItemId);
  }

  static async getAllScheduleItem() {
    return ScheduleItem.findAll();
  }
  static async getAllScheduleItemByScheduleId(scheduleId) {
    return ScheduleItem.findAll({ where: { scheduleId: scheduleId }, include: [{ model: Lesson }, { model: Teacher }] });
  }
  static async getAllScheduleItemByClassRoomAndDate(classRoomId, indexDate) {
    return ScheduleItem.findAll({
      where: { dayOfWeek: moment(indexDate).isoWeekday() },
      include: [
        {
          model: Schedule,
          where: {
            classRoomId: classRoomId,
            applyStart: { [Op.lte]: indexDate },
            applyEnd: { [Op.gte]: indexDate }
          }
        },
        {
          model: Lesson,
          where:{
            active: true
          }
        }
      ]
    });
  }
  static async getAllScheduleItemByTeacherAndDate(teacherId, indexDate) {
    return ScheduleItem.findAll({
      where:
      {
        dayOfWeek: moment(indexDate).isoWeekday(),
        teacherId: teacherId
      },
      include: [
        {
          model: Schedule,
          where: {
            applyStart: { [Op.lte]: indexDate },
            applyEnd: { [Op.gte]: indexDate }
          }
        },
        {
          model: Lesson,
          where:{
            active : true
          }
        }
      ]
    });
  }
  static async createScheduleItem(scheduleItemData) {
    scheduleItemData.scheduleItemId = generateId();
    return ScheduleItem.create(scheduleItemData);
  }

  static async updateScheduleItem(scheduleItemId, scheduleItemData) {
    await ScheduleItem.update(scheduleItemData, {
      where: { scheduleItemId: scheduleItemId },

    });
    return this.getScheduleItemById(scheduleItemId);
  }

  static async deleteScheduleItemById(scheduleItemId) {
    return ScheduleItem.destroy({
      where: { scheduleItemId: scheduleItemId },
    });
  }
}

module.exports = ScheduleItemService;
