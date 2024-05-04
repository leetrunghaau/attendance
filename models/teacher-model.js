const { DataTypes } = require('sequelize');
const db = require('../config/Database');


const Teacher = db.define('Teacher', {
    teacherId: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        field: 'teacher_id'
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
    email: {
        type: DataTypes.STRING(50),
        field: "email"
    }
}, {
    tableName: 'teacher',
    timestamps: false
});

module.exports = Teacher;
