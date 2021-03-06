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

export const sortSchools = (a, b) => {
    const x = a.name.toLowerCase();
    const y = b.name.toLowerCase();
    if(x < y) return -1;
    if(x > y) return 1;
    return 0;
}
export const sortStudents = (a, b) => {
    const x = a.lastName.toLowerCase();
    const y = b.lastName.toLowerCase();
    const z = a.firstName.toLowerCase();
    const zz = b.firstName.toLowerCase();
    if(x < y) return -1;
    if(x > y) return 1;
    if(x === y) {
        if(z < zz) return -1;
        if(z > zz) return 1;
    }
    return 0;
}

export const selected = (_pathname, pathname, startsWith = false) => {
    const style = {};
    if(_pathname === pathname || (pathname.indexOf(_pathname) === 0 && startsWith)) style.fontWeight = 'bold';
    return style;
}