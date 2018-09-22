const conn = require('./conn');
const School = require('./School');
const Student = require('./Student');


Student.belongsTo(School);
School.hasMany(Student);

const syncAndSeed = () => {
    let Eric, Mymy, Pearl, Brian, Hofstra, Michigan, NYU;
    conn.sync({ force: true })
        .then(() => Promise.all([
            Student.create({ name: 'Eric' }),
            Student.create({ name: 'Mymy' }),
            Student.create({ name: 'Pearl' }),
            Student.create({ name: 'Brian' })
        ]))
        .then(students => {
            [Eric, Mymy, Pearl, Brian] = students;
            return Promise.all([
                School.create({ name: 'Hofstra' }),
                School.create({ name: 'Michigan'}),
                School.create({ name: 'NYU' })
            ])
        })
        .then(schools => {
            [Hofstra, Michigan, NYU] = schools;
            Pearl.setSchool(NYU);
            Brian.setSchool(Michigan);
            Brian.setSchool(Hofstra);
        })
}

module.exports = {
    syncAndSeed,
    models: {
        School,
        Student
    }
}