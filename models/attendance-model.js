const { DataTypes } = require('sequelize');
const db = require('../config/Database');
const Student = require('./student-model');
const Lesson = require('./lesson-model');



const Attendance = db.define('Attendance', {
    attendanceId: {
        type: DataTypes.STRING(30),
        primaryKey: true,
        field: 'attendance_id'
    },
    studentId: {
        type: DataTypes.STRING(20),
        field: "student_id"
    },
    lessonId: {
        type: DataTypes.STRING(20),
        field: "lesson_id"
    },
    checkinTime: {
        type: DataTypes.DATE,
        field: "checkin_Time"
    },
    checkoutTime: {
        type: DataTypes.DATE,
        field: "checkout_Time"
    },
    description: {
        type: DataTypes.STRING(100),
        field: "description"
    }

}, {
    tableName: 'attendance',
    timestamps: false
});
Attendance.belongsTo(Student, { foreignKey: 'studentId', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
Attendance.belongsTo(Lesson, { foreignKey: 'lessonId', onDelete: 'CASCADE', onUpdate: 'CASCADE' })

module.exports = Attendance;
