const { DataTypes } = require('sequelize');
const db = require('../config/Database');


const Room = db.define('Room', {
    roomId: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        field: 'room_id'
    },
    RoomName: {
        type: DataTypes.STRING(20),
        field: 'Room_name'
    }
}, {
    tableName: 'room',
    timestamps: false
});

module.exports = Room;
