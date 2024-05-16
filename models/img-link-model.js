const { DataTypes } = require('sequelize');
const db = require('../config/Database');
const Room = require('./class-room-model');


const ImgLink = db.define('ImgLink', {
    imgLinkId: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        field: 'img_link_id'
    },
    linkValue: {
        type: DataTypes.TEXT,
        field: 'link_value'
    },
    
    imgStatus: {
        type: DataTypes.TEXT,
        field: 'img_status'
    },
    imgTime: {
        type: DataTypes.DATE,
        field: 'img_time'
    },
    classRoomId: {
        type: DataTypes.STRING(20),
        field: "class_room_id"
    }
}, {
    tableName: 'img_link',
    timestamps: false,
    comment:""
});
ImgLink.belongsTo(Room, { foreignKey: "classRoomId", onDelete: 'CASCADE', onUpdate: 'CASCADE' });
module.exports = ImgLink;

