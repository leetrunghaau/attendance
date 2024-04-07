const { DataTypes } = require('sequelize');
const db = require('../config/Database');
const Lesson = require('./lesson-model');
const Schedule = require('./schedule_model');

const ScheduleItem = db.define('ScheduleItem', {
    scheduleItemId: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        field: 'schedule_item_id'
    },
    name: {
        type: DataTypes.STRING(50),
        field: 'name'
    },
    lessonId: {
        type: DataTypes.STRING(20),
        field: "lession_id"
        
    },
    scheduleId: {
        type: DataTypes.STRING(20),
        field: 'schedule_id'
    },
}, {
    tableName: 'schedule_item',
    timestamps: false
});
ScheduleItem.belongsTo(Lesson, { foreignKey: 'lessonId', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
ScheduleItem.belongsTo(Schedule, { foreignKey: 'scheduleId', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
module.exports = ScheduleItem;