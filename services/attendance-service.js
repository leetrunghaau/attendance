
const { generateKey } = require('crypto');
const Attendance = require('../models/attendance-model');
const { generateId, generateRandomString } = require('../helpers/generate-key');

class AttendanceService {
  static async getAttendanceById(attendanceId) {
    return Attendance.findByPk(attendanceId);
  }
  static async getAllAttendance() {
    return Attendance.findAll();
  }
  static async createAttendance(attendanceData) {
    attendanceData.attendanceId = generateRandomString(30)
    return Attendance.create(attendanceData);
  }

  static async updateAttendance(attendanceId, attendanceData) {
    await Attendance.update(attendanceData, {
      where: { attendanceId: attendanceId },
    });
    return this.getAttendanceById(attendanceId);
  }

  static async deleteAttendanceById(attendanceId) {
    return Attendance.destroy({
      where: { attendanceId: attendanceId },
    });
  }
}

module.exports = AttendanceService;
