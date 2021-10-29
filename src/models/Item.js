const DataTypes = require('sequelize');
const database = require('../database');

const Item = database.define('item',{
    id: {
        type: DataTypes.STRING,
        autoIncrement: false,
        allowNull: false,
        primaryKey: true
    },
    quantity: DataTypes.INTEGER
})

module.exports = Item;