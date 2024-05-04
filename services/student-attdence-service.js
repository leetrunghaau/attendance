
const { generateKey } = require('crypto');
const StudentAttendence = require('../models/student-attendence-model');
const { generateId, generateRandomString } = require('../helpers/generate-key');
const ClassRoom = require('../models/class-room-model');
const Lesson = require('../models/lesson-model');
const ScheduleItem = require('../models/schedule-item-model');
const Schedule = require('../models/schedule_model');
const Student = require('../models/student-model');

class StudentAttendenceService {
    static async getStudentAttendenceById(studentAttendenceId) {
        return StudentAttendence.findByPk(studentAttendenceId);
    }

    static async getAllStudentAttendence() {
        return StudentAttendence.findAll();
    }
    static async getAllStudentAttendenceByStudentAndDate(studentId, indexDate) {
        return StudentAttendence.findAll({
            where: {
                attendenceDate: indexDate,
                studentId: studentId
            },
            include: [{ model: ScheduleItem, include: [{ model: Lesson }] }]
        });
    }

    static async getAllStudentAttendenceByClassRoomAndDate(classRoomId, indexDate) {
        return StudentAttendence.findAll({
            where: {
                '$ScheduleItem->Schedule.class_room_id$': classRoomId,
                attendenceDate: indexDate
            },
            include: [
                {
                    model: ScheduleItem,
                    include: [
                        { model: Lesson },
                        { model: Schedule }
                    ]
                },
                { model: Student }
            ]
        });
    }
    static async createStudentAttendence(studentAttendenceData) {
        studentAttendenceData.studentAttendenceId = generateRandomString(29);
        return StudentAttendence.create(studentAttendenceData);
    }
    static async createMultipleStudentAttendence(studentAttendenceDataArray) {
        const generatedIds = studentAttendenceDataArray.map(data => {
            return { ...data, studentAttendanceId: generateRandomString(29) };
        });

        return StudentAttendence.bulkCreate(generatedIds);
    }
    static async updateStudentAttendence(studentAttendenceId, studentAttendenceData) {
        await StudentAttendence.update(studentAttendenceData, {
            where: { studentAttendenceId: studentAttendenceId },

        });
        return this.getStudentAttendenceById(studentAttendenceId);
    }

    static async deleteStudentAttendenceById(studentAttendenceId) {
        return StudentAttendence.destroy({
            where: { studentAttendenceId: studentAttendenceId },
        });
    }
}

module.exports = StudentAttendenceService;
