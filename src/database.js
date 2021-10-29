const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres','postgres','postgres',{
    dialect: 'postgres',
    host: '172.99.0.2',
    port: 5432
})

module.exports = sequelize;