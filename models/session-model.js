const { DataTypes } = require('sequelize');
const db = require('../config/Database');
const Schedule = require('./schedule_model');


const Session = db.define('Session', {
    sessionId: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        field: 'session_id'
    },
    
    scheduleId: {
        type: DataTypes.STRING(20),
        field: "schedule_id"
    },
    sessionDate:{
        type: DataTypes.DATE,
        field:"session_date"
    },
    sesionStatus: {
        type: DataTypes.STRING(50),
        field: "session_status"
    }
}, {
    tableName: 'session',
    timestamps: false
});

Session.belongsTo(Schedule, { foreignKey: "scheduleId", onDelete: 'CASCADE', onUpdate: 'CASCADE' });
module.exports = Session;
