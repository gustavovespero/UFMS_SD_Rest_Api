const DataTypes = require('sequelize');
const database = require('../database');
const Customer = require('./Customer');
const Employee = require('./Employee');

const Order = database.define('order',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
})

Order.belongsTo(Customer,{
    constraint: true,
    foreignKey: 'customer_id'
})

Order.belongsTo(Employee,{
    constraint: true,
    foreignKey: 'employee_id'
})

module.exports = Order;