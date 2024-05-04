
const { generateKey } = require('crypto');
const TeacherAttendence = require('../models/teacher-attendence-model');
const { generateId, generateRandomString } = require('../helpers/generate-key');
const ClassRoom = require('../models/class-room-model');
const Lesson = require('../models/lesson-model');
const ScheduleItem = require('../models/schedule-item-model');
const Schedule = require('../models/schedule_model');
const Teacher = require('../models/teacher-model');

class TeacherAttendenceService {
    static async getTeacherAttendenceById(teacherAttendenceId) {
        return TeacherAttendence.findByPk(teacherAttendenceId);
    }

    static async getAllTeacherAttendence() {
        return TeacherAttendence.findAll();
    }
    static async getAllTeacherAttendenceByTeacherAndDate(teacherId, indexDate) {
        return TeacherAttendence.findAll({
            where: {
                attendenceDate: indexDate,
                teacherId: teacherId
            },
            include: [
                {
                    model: ScheduleItem,
                    include:
                        [
                            { model: Lesson },
                            { model: Schedule, include: [{ model: ClassRoom }] }
                        ]
                }]
        });
    }
    static async report(teacherId, indexDate) {
        return TeacherAttendence.findAll({
            where: {
                attendenceDate: indexDate,
                teacherId: teacherId
            },
            include: [
                {
                    model: ScheduleItem,
                    include:
                        [
                            { model: Lesson },
                            { model: Schedule, include: [{ model: ClassRoom }] }
                        ]
                },
                { model: Teacher }
            ]
        });
    }
    static async createTeacherAttendence(teacherAttendenceData) {
        teacherAttendenceData.teacherAttendanceId = generateRandomString(29);
        return TeacherAttendence.create(teacherAttendenceData);
    }
    static async createMultipleTeacherAttendence(teacherAttendenceDataArray) {
        const generatedIds = teacherAttendenceDataArray.map(data => {
            return { ...data, teacherAttendanceId: generateRandomString(29) };
        });

        return TeacherAttendence.bulkCreate(generatedIds);
    }
    static async updateTeacherAttendence(teacherAttendenceId, teacherAttendenceData) {
        await TeacherAttendence.update(teacherAttendenceData, {
            where: { teacherAttendenceId: teacherAttendenceId },

        });
        return this.getTeacherAttendenceById(teacherAttendenceId);
    }

    static async deleteTeacherAttendenceById(teacherAttendenceId) {
        return TeacherAttendence.destroy({
            where: { teacherAttendenceId: teacherAttendenceId },
        });
    }
}

module.exports = TeacherAttendenceService;
