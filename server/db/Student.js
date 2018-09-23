const conn = require('./conn');

const Student = conn.define('student', {
    firstName: {
        type: conn.Sequelize.STRING,
        allowNull: false,
        unique: false,
        validate: { notEmpty: true }
    },
    lastName: {
        type: conn.Sequelize.STRING,
        allowNull: false,
        unique: false,
        validate: { notEmpty: true }
    },
    GPA: {
        type: conn.Sequelize.DECIMAL,
        allowNull: false,
        unique: false,
        validate: { min: 0.0, max: 4.0 }
    }
})

module.exports = Student;