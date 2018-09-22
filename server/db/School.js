const conn = require('./conn');

const School = conn.define('school', {
    name: {
        type: conn.Sequelize.STRING,
        allowNull: false
    }
})

module.exports = School;