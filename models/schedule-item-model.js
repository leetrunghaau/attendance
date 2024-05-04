const { DataTypes } = require('sequelize');
const db = require('../config/Database');
const Lesson = require('./lesson-model');
const Schedule = require('./schedule_model');
const Teacher = require('./teacher-model');

const ScheduleItem = db.define('ScheduleItem', {
    scheduleItemId: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        field: 'schedule_item_id'
    },
    teacherId: {
        type: DataTypes.STRING(20),
        field: "teacher_id"
    },
    subject: {
        type: DataTypes.STRING(50),
        field: 'subject'
    },
    lessonId: {
        type: DataTypes.STRING(20),
        field: "lession_id"

    },
    dayOfWeek: {
        type: DataTypes.TINYINT,
        field: "day_of_week"
    },
    scheduleId: {
        type: DataTypes.STRING(20),
        field: 'schedule_id'
    },
}, {
    tableName: 'schedule_item',
    timestamps: false
});

ScheduleItem.belongsTo(Teacher, { foreignKey: 'teacherId', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
ScheduleItem.belongsTo(Lesson, { foreignKey: 'lessonId', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
ScheduleItem.belongsTo(Schedule, { foreignKey: 'scheduleId', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
module.exports = ScheduleItem;