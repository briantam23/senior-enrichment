const conn = require('./conn');

const Student = conn.define('student', {
    name: {
        type: conn.Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Student;