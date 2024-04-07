const { DataTypes } = require('sequelize');
const db = require('../config/Database');


const ClassRoom = db.define('ClassRoom', {
    classRoomId: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        field: 'class_room_id'
    },
    name: {
        type: DataTypes.STRING(20),
        field: 'name'
    }
}, {
    tableName: 'class_room',
    timestamps: false
});

module.exports = ClassRoom;
