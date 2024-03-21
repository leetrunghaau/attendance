const { DataTypes } = require('sequelize');
const db = require('../config/Database');


const User = db.define('User', {
  userId: {
    type: DataTypes.STRING(20),
    primaryKey: true,
    field: 'user_id'
  },
  userName:{
    type: DataTypes.STRING(20),
    field:"user_name"
  },
  email: DataTypes.STRING(50),
  name: {
    type: DataTypes.STRING(50),
    field: 'name'
  },
  gender: DataTypes.STRING(7),
  birthDate: {
    type: DataTypes.DATEONLY,
    field: 'birth_date'
  },
  placeOfOrigin: {
    type: DataTypes.STRING(100),
    field: 'place_of_origin'
  },
  password: DataTypes.TEXT,
  role: DataTypes.STRING(11)


}, {
  tableName: 'user',
  timestamps: false
});

module.exports = User;
