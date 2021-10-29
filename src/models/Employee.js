const DataTypes = require('sequelize');
const database = require('../database');
const Order =  require('./Order');

const Employee = database.define('employee', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birth_date: DataTypes.DATEONLY,
    role: DataTypes.STRING
})

module.exports = Employee;