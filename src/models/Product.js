const DataTypes = require('sequelize');
const database = require('../database');
const Item = require('./Item');
const Order = require('./Order');

const Product = database.define('product',{
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
    price: DataTypes.DECIMAL,
    description: DataTypes.STRING
})

Product.belongsToMany(Order,{
    through: Item,
    constraint: true,
    foreignKey: 'product_id'
})

Order.belongsToMany(Product,{
    through: Item,
    constraint: true,
    foreignKey: 'order_id'
})

module.exports = Product;