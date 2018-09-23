import axios from "axios";
import { LOAD_INITIAL_SCHOOLS, LOAD_INITIAL_STUDENTS, DESTROY_SCHOOL } from './constants';

const _loadInitialSchools = schools => ({
    type: LOAD_INITIAL_SCHOOLS,
    schools
})
export const loadInitialSchools = () => (
    dispatch => {
        return axios.get('/api/schools')
            .then(res => res.data)
            .then(schools => dispatch(_loadInitialSchools(schools)))
    }
)
const _destroySchool = school => ({
    type: DESTROY_SCHOOL,
    schools: school
})
export const destroySchool = (school, history) => (
    dispatch => {
        return axios.delete(`/api/schools/${school.id}`)
            .then(() => dispatch(_destroySchool(school)))
            .then(() => history.push('/schools'))
    }
)



const _loadInitialStudents = students => ({
    type: LOAD_INITIAL_STUDENTS,
    students
})
export const loadInitialStudents = () => (
    dispatch => {
        return axios.get('/api/students')
            .then(res => res.data)
            .then(students => dispatch(_loadInitialStudents(students)))
    }
)

