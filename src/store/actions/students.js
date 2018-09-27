import { LOAD_INITIAL_STUDENTS, FETCH_STUDENT, CREATE_STUDENT, UPDATE_STUDENT, DESTROY_STUDENT } from '../constants';
import axios from 'axios';
import { fetchSchool, _unfetchSchool } from './schools';


const _loadInitialStudents = students => ({
    type: LOAD_INITIAL_STUDENTS,
    students
})
export const loadInitialStudents = () => (
    dispatch => (
        axios.get('/api/students')
            .then(res => res.data)
            .then(students => dispatch(_loadInitialStudents(students)))
    )
)

////////////////////////////////////////////

const _fetchStudent = student => ({
    type: FETCH_STUDENT,
    student
})
export const fetchStudent = id => (
    dispatch => (
        axios.get(`/api/students/${id}`)
            .then(res => res.data)
            .then(student => {
                dispatch(_fetchStudent(student))
                student.schoolId ? dispatch(fetchSchool(student.schoolId)) : dispatch(_unfetchSchool())
            })
    )
)

////////////////////////////////////////////

const _createStudent = student => ({
    type: CREATE_STUDENT,
    students: student
})
export const createStudent = (student, history) => (
    dispatch => (
        axios.post('/api/students', student)
            .then(res => res.data)
            .then(_student => dispatch(_createStudent(_student)))
            .then(() => history.push('/students'))
    )
)

const _updateStudent = student => ({
    type: UPDATE_STUDENT,
    students: student
})
export const updateStudent = (student, history) => (
    dispatch => (
        axios.put(`/api/students/${student.id}`, student)
            .then(res => res.data)
            .then(_student => dispatch(_updateStudent(_student)))
            .then(() => history.push('/students'))
    )
)

const _destroyStudent = student => ({
    type: DESTROY_STUDENT,
    students: student
})
export const destroyStudent = (student, history) => (
    dispatch => (
        axios.delete(`/api/students/${student.id}`)
            .then(() => dispatch(_destroyStudent(student)))
            .then(() => history.push('/students'))
    )
)