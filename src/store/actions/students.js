import { LOAD_INITIAL_STUDENTS, FETCH_STUDENT } from '../constants';
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