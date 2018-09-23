const conn = require('./conn');

const School = conn.define('school', {
    name: {
        type: conn.Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: { notEmpty: true }
    },
    description: {
        type: conn.Sequelize.STRING,
        allowNull: true,
        unique: false,
        validate: { notEmpty: false }
    },
    address: {
        type: conn.Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: { notEmpty: true }
    }
})

module.exports = School;