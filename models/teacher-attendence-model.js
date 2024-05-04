const { DataTypes } = require('sequelize');
const db = require('../config/Database');
const Teacher = require('./teacher-model');
const Lesson = require('./lesson-model');
const ScheduleItem = require('./schedule-item-model');



const TeacherAttendance = db.define('TeacherAttendance', {
    teacherAttendanceId: {
        type: DataTypes.STRING(30),
        primaryKey: true,
        field: 'teacher_attendance_id'
    },
    teacherId: {
        type: DataTypes.STRING(20),
        field: "teacher_id"
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
    tableName: 'teacher_attendance',
    timestamps: false
});
TeacherAttendance.belongsTo(Teacher, { foreignKey: 'teacherId', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
TeacherAttendance.belongsTo(ScheduleItem, { foreignKey: 'scheduleItemId', onDelete: 'CASCADE', onUpdate: 'CASCADE' })

module.exports = TeacherAttendance;
