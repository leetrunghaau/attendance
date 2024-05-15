
const { generateKey } = require('crypto');
const Teacher = require('../models/teacher-model');
const { generateId, generateRandomString, generateGVId } = require('../helpers/generate-key');
const ClassRoom = require('../models/class-room-model');

class TeacherService {
  static async getTeacherById(teacherId) {
    return Teacher.findByPk(teacherId);
  }
  
  static async getAllTeacher() {
    return Teacher.findAll();
  }
  static async createTeacher(teacherData) {
    teacherData.teacherId = generateGVId();
    return Teacher.create(teacherData);
  }

  static async updateTeacher(teacherId, teacherData) {
    await Teacher.update(teacherData, {
      where: { teacherId: teacherId },
      
    });
    return this.getTeacherById(teacherId);
  }

  static async deleteTeacherById(teacherId) {
    return Teacher.destroy({
      where: { teacherId: teacherId },
    });
  }
}

module.exports = TeacherService;
