
const { generateKey } = require('crypto');
const Driver = require('../models/driver-model');
const { generateId, generateRandomString } = require('../helpers/generate-key');
const ClassRoom = require('../models/class-room-model');

class DriverService {
  static async getDriverById(driverId) {
    return Driver.findByPk(driverId);
  }
  
  static async getAllDriver() {
    return Driver.findAll({
      include: [{model: ClassRoom}]
    });
  }
  static async createDriver(DriverData) {
    DriverData.driverId = generateRandomString(5);
    return Driver.create(DriverData);
  }

  static async updateDriver(driverId, DriverData) {
    await Driver.update(DriverData, {
      where: { driverId: driverId },
      
    });
    return this.getDriverById(driverId);
  }

  static async deleteDriverById(driverId) {
    return Driver.destroy({
      where: { driverId: driverId },
    });
  }
}

module.exports = DriverService;
