export const enrolled = (students, id) => (
    students.filter(student => student.schoolId === id*1)
)
export const unenrolled = (students, id) => (
    students.filter(student => student.schoolId !== id*1)
)


export const findStudentByName = (students, name) => {
    name = name.split(', ');
    return students.find(student => student.lastName === name[0] && student.firstName === name[1]);
}
export const findStudentByURL = (students, id) => (
    students.find(student => student.id === id*1)
)
export const findStudentsBySchool = (students, school) => (
    students.filter(student => student.schoolId === school.id)
)


export const findSchoolByName = (schools, schoolName) => (
    schools.find(school => school.name === schoolName)
)
export const findSchoolByURL = (schools, id) => (
    schools.find(school => school.id === id*1)
)
export const findSchoolByStudent = (schools, student) => (
    schools.find(school => school.id === student.schoolId)
)