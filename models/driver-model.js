const { DataTypes } = require('sequelize');
const db = require('../config/Database');
const Room = require('./room-model');


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

    roomId: {
        type: DataTypes.STRING(20),
        field: "room_id"
    }
}, {
    tableName: 'driver',
    timestamps: false
});
Driver.belongsTo(Room, { foreignKey: "roomId", onDelete: 'CASCADE', onUpdate: 'CASCADE' });
module.exports = Driver;
