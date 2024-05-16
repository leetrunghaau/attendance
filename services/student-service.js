
const { generateKey } = require('crypto');
const Student = require('../models/student-model');
const { generateId, generateHSId } = require('../helpers/generate-key');

class StudentService {
  static async getStudentById(studentId) {
    return Student.findByPk(studentId);
  }

  static async getStudentByClassRoomId(classRoomId) {
    return Student.findAll({ where: { classRoomId: classRoomId } });
  }
  static async getAllStudent() {
    return Student.findAll();
  }

  static async createStudent(studentData) {
    studentData.studentId = generateHSId()
    return Student.create(studentData);
  }
  static async createMultipleStudents(studentDataArray) {
    const generatedIds = studentDataArray.map(data => {
      return { ...data, studentId: generateHSId() };
    });
    return Student.bulkCreate(generatedIds);
  }
  static async updateStudent(studentId, studentData) {
    await Student.update(studentData, {
      where: { studentId: studentId },
    });
    return this.getStudentById(studentId);
  }

  static async deleteStudentById(studentId) {
    return Student.destroy({
      where: { studentId: studentId },
    });
  }
}

module.exports = StudentService;
