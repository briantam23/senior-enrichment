const conn = require('./conn');

const School = conn.define('school', 
    {
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
    },
    {
        hooks: {
            beforeCreate: (school, options) => schoolHook(school),
            beforeUpdate: (school, option) => schoolHook(school)
        }
    }
)

const schoolHook = school => {
    const { name } = school;
    school.name = name.charAt(0).toUpperCase() + name.slice(1);
}


module.exports = School;