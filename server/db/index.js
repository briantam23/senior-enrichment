const conn = require('./conn');
const School = require('./School');
const Student = require('./Student');


Student.belongsTo(School);
School.hasMany(Student);

const syncAndSeed = () => {
    let mike, jamel, robby, brian, johnny, georgeWashington, cornwell, westHempstead, islandPark;
    conn.sync({ force: true })
        .then(() => Promise.all([
            Student.create({ 
                firstName: 'Mike',
                lastName: 'Brown',
                GPA: 2.8
            }),
            Student.create({ 
                firstName: 'Jamel',
                lastName: 'Smith',
                GPA: 3.1
            }),
            Student.create({ 
                firstName: 'Robby',
                lastName: 'Chan',
                GPA: 3.5 
            }),
            Student.create({ 
                firstName: 'Brian',
                lastName: 'Peters',
                GPA: 3.5
            }),
            Student.create({ 
                firstName: 'Johnny',
                lastName: 'Johnson',
                GPA: 3.0
            })
        ]))
        .then(students => {
            [mike, jamel, robby, brian] = students;
            return Promise.all([
                School.create({ 
                    name: 'George Washington',
                    description: 'GW',
                    address: '231 Main Street, New York, NY 10007' 
                }),
                School.create({ 
                    name: 'Cornwell',
                    description: 'CW',
                    address: '43 Stewart Avenue, Brooklyn, NY 11216'
                }),
                School.create({ 
                    name: 'West Hempstead',
                    description: 'WH',
                    address: '4 Linden Street, West Hempstead, NY 11552' 
                }),
                School.create({ 
                    name: 'Island Park',
                    description: 'IP',
                    address: '33 Ocean Drive, Island Park, NY 11558' 
                })
            ])
        })
        .then(schools => {
            [georgeWashington, cornwell, westHempstead, islandPark] = schools;
            mike.setSchool(westHempstead);
            jamel.setSchool(georgeWashington);
            brian.setSchool(georgeWashington);
        })
}

module.exports = {
    syncAndSeed,
    models: {
        School,
        Student
    }
}