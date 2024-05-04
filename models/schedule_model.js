const { DataTypes } = require('sequelize');
const db = require('../config/Database');
const ClassRoom = require('./class-room-model');


const Schedule = db.define('Schedule', {
    scheduleId: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        field: 'schedule_id'
    },
    classRoomId: {
        type: DataTypes.STRING(20),
        field: "class_room_id"
    },
    applyStart: {
        type: DataTypes.DATEONLY,
        field: "apply_start"
    },
    applyEnd: {
        type: DataTypes.DATEONLY,
        field: "apply_end"
    },
}, {
    tableName: 'schedule',
    timestamps: false,
    comment:"thời khóa biểu của 1 buổi của 1 lớp"
});

Schedule.belongsTo(ClassRoom, { foreignKey: "classRoomId", onDelete: 'CASCADE', onUpdate: 'CASCADE' });
module.exports = Schedule;
