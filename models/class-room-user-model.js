const { DataTypes } = require('sequelize');
const db = require('../config/Database');
const User = require('./user-model');
const ClassRoom = require('./class-room-model');


const ClassRoomUser = db.define('ClassRoomUser', {
    classRoomUserId: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        field: 'class_room_user_id'
    },
    classRoomId: {

        type: DataTypes.STRING(20),
        field: "class_room_id"
    },
    userId: {
        type: DataTypes.STRING(20),
        field: "user_id"
    }
}, {
    tableName: 'class_room_user',
    timestamps: false
});
ClassRoomUser.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
ClassRoomUser.belongsTo(ClassRoom, { foreignKey: 'classRoomId', onDelete: 'CASCADE', onUpdate: 'CASCADE' })

module.exports = ClassRoomUser;
