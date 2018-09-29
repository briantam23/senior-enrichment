export const enrolled = (students, id) => (
    students.filter(student => student.schoolId === id*1)
)

export const unenrolled = (students, id) => (
    students.filter(student => student.schoolId !== id*1)
)

export const findSchoolByURL = (schools, id) => (
    schools.find(school => school.id === id*1)
)

export const findStudentByURL = (students, id) => (
    students.find(student => student.id === id*1)
)
/* export const findStudentByURL = (students, id) => (
    new Promise((resolve, reject) => {
        resolve(students.find(student => student.id === id*1))
    })
)  */

export const findSchoolByStudent = (schools, student) => (
    new Promise((resolve, reject) => {
        resolve(schools.find(school => school.id === student.schoolId))
    })
)