const { DataTypes } = require('sequelize');
const db = require('../config/Database');
const User = require('./user-model');
const ClassRoom = require('./class-room-model');


const Attendance = db.define('Attendance', {
    attendanceId: {
        type: DataTypes.STRING(30),
        primaryKey: true,
        field: 'attendance_id'
    },
    classRoomId: {
        type: DataTypes.STRING(20),
        field: "class_room_id"
    },
    userId: {
        type: DataTypes.STRING(20),
        field: "user_id"
    },
    checkinTime:{
        type: DataTypes.DATE,
        field:"checkin_Time"
    },
    checkoutTime:{
        type: DataTypes.DATE,
        field:"checkout_Time"
    },
    state:DataTypes.STRING(50)
}, {
    tableName: 'attendance',
    timestamps: false
});
Attendance.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
Attendance.belongsTo(ClassRoom, { foreignKey: 'classRoomId', onDelete: 'CASCADE', onUpdate: 'CASCADE' })

module.exports = Attendance;
