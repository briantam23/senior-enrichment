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
        unique: false
    },
    address: {
        type: conn.Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: { notEmpty: true }
    }
})

const schoolHook = school => {
    const { name } = school;
    school.name = name.charAt(0).toUpperCase() + name.slice(1);
}

School.beforeCreate((school, options) => schoolHook(school));
School.beforeUpdate((school, option) => schoolHook(school))

module.exports = School;