const { DataTypes } = require('sequelize');
const db = require('../config/Database');
const Student = require('./student-model');
const Lesson = require('./lesson-model');
const ScheduleItem = require('./schedule-item-model');



const StudentAttendance = db.define('StudentAttendance', {
    studentAttendanceId: {
        type: DataTypes.STRING(30),
        primaryKey: true,
        field: 'student_attendance_id'
    },
    studentId: {
        type: DataTypes.STRING(20),
        field: "student_id"
    },
    scheduleItemId: {
        type: DataTypes.STRING(20),
        field: "schedule_item_id"
    },
    attendenceStatus:{
        type:DataTypes.STRING(100),
        field:"attendence_status"
    },
    attendenceDate:{
        type:DataTypes.DATEONLY,
        field:"attendence_date"
    },
    checkinTime: {
        type: DataTypes.TIME,
        field: "checkin_Time"
    },
    checkoutTime: {
        type: DataTypes.TIME,
        field: "checkout_Time"
    }

}, {
    tableName: 'student_attendance',
    timestamps: false
});
StudentAttendance.belongsTo(Student, { foreignKey: 'studentId', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
StudentAttendance.belongsTo(ScheduleItem, { foreignKey: 'scheduleItemId', onDelete: 'CASCADE', onUpdate: 'CASCADE' })

module.exports = StudentAttendance;
