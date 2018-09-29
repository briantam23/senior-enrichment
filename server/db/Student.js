const conn = require('./conn');

const Student = conn.define('student', {
    lastName: {
        type: conn.Sequelize.STRING,
        allowNull: false,
        unique: false,
        validate: { notEmpty: true }
    },
    firstName: {
        type: conn.Sequelize.STRING,
        allowNull: false,
        unique: false,
        validate: { notEmpty: true }
    },
    GPA: {
        type: conn.Sequelize.DECIMAL(2, 1),
        allowNull: false,
        unique: false,
        validate: { min: 0.0, max: 4.0 }
    }
})

const studentHook = student => {
    const { lastName, firstName } = student;
    student.lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
    student.firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
}

Student.beforeCreate((student, options) => studentHook(student));
Student.beforeUpdate((student, options) => studentHook(student));

module.exports = Student;