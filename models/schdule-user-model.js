const { DataTypes } = require('sequelize');
const db = require('../config/Database');
const User = require('./user-model');
const Schedule = require('./schedule_model');


const ScheduleUser = db.define('CourseTeacher', {
    scheduleUserId: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        field: 'schedule_user_id'
    },
    scheduleId: {

        type: DataTypes.STRING(20),
        field: "schedule_id"
    },
    userId: {
        type: DataTypes.STRING(20),
        field: "user_id"
    }
}, {
    tableName: 'schedule_user',
    timestamps: false
});
ScheduleUser.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
ScheduleUser.belongsTo(Schedule, { foreignKey: 'scheduleId', onDelete: 'CASCADE', onUpdate: 'CASCADE' })

module.exports = ScheduleUser;
