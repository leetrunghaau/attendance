const { DataTypes } = require('sequelize');
const db = require('../config/Database');
const Room = require('./class-room-model');


const Driver = db.define('Driver', {
    driverId: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        field: 'driver_id'
    },
    driverName: {
        type: DataTypes.STRING(20),
        field: 'driver_name'
    },
    classRoomId: {
        type: DataTypes.STRING(20),
        field: "class_room_id"
    }
}, {
    tableName: 'driver',
    timestamps: false,
    comment:""
});
Driver.belongsTo(Room, { foreignKey: "classRoomId", onDelete: 'CASCADE', onUpdate: 'CASCADE' });
module.exports = Driver;

