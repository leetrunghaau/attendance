const { DataTypes } = require('sequelize');
const db = require('../config/Database');
const ClassRoom = require('./class-room-model');


const Schedule = db.define('Schedule', {
    scheduleId: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        field: 'schedule_id'
    },
    name: {
        type: DataTypes.STRING(50),
        field: "name"
    },
    classRoomId: {
        type: DataTypes.STRING(50),
        field: "class_room_id"
    },
    timeStart: {
        type: DataTypes.TIME,
        field: "time_start"
    },
    timeEnd: {
        type: DataTypes.TIME,
        field: "time_end"
    },
    applyStart: {
        type: DataTypes.DATEONLY,
        field: "apply_start"
    },
    applyEnd: {
        type: DataTypes.DATEONLY,
        field: "apply_end"
    },
    dayOfWeek: {
        type: DataTypes.TINYINT,
        field: "day_of_week"
    },
}, {
    tableName: 'schedule',
    timestamps: false,
    comment:"thời khóa biểu của 1 buổi của 1 lớp"
});

Schedule.belongsTo(ClassRoom, { foreignKey: "classRoomId", onDelete: 'CASCADE', onUpdate: 'CASCADE' });
module.exports = Schedule;
