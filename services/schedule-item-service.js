
const { generateKey } = require('crypto');
const ScheduleItem = require('../models/schedule-item-model');
const { generateId, generateRandomString } = require('../helpers/generate-key');

class ScheduleItemService {
  static async getScheduleItemById(scheduleItemId) {
    return ScheduleItem.findByPk(scheduleItemId);
  }
  static async getAllScheduleItem() {
    return ScheduleItem.findAll();
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
