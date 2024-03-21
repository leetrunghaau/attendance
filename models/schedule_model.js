const { DataTypes } = require('sequelize');
const db = require('../config/Database');
const Room = require('./room-model');


const Schedule = db.define('Schedule', {
    ScheduleId: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        field: 'schedule_id'
    },
    subject: {
        type: DataTypes.STRING(50),
        field: "subject"
    },
    roomId: {
        type: DataTypes.STRING(50),
        field: "room_id"
    },
    timeStart: {
        type: DataTypes.TIME,
        field: "time_start"
    },
    timeEnd: {
        type: DataTypes.TIME,
        field: "time_end"
    },
    dayOfWeek: {

        type: DataTypes.INTEGER,
        field: "day_of_week"
    },
}, {
    tableName: 'schedule',
    timestamps: false
});

Schedule.belongsTo(Room, { foreignKey: "roomId", onDelete: 'CASCADE', onUpdate: 'CASCADE' });
module.exports = Schedule;
