const { DataTypes } = require('sequelize');
const db = require('../config/Database');
const ClassRoom = require('./class-room-model');


const Student = db.define('Student', {
    studentId: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        field: 'student_id'
    },
    fullName: {
        type: DataTypes.STRING(20),
        field: "full_name"
    },
    phone: {
        type: DataTypes.STRING(15),
        field: "phone"
    },
    gender: {
        type: DataTypes.STRING(7),
        field: "gender"
    },
    birthDate: {
        type: DataTypes.DATEONLY,
        field: 'birth_date'
    },
    placeOfOrigin: {
        type: DataTypes.STRING(100),
        field: 'place_of_origin'
    },
    classRoomId: {
        type: DataTypes.STRING(20),
        field: "class_room_id"
    }
}, {
    tableName: 'student',
    timestamps: false
});

Student.belongsTo(ClassRoom, { foreignKey: 'classRoomId', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
module.exports = Student;
