import axios from "axios";
import { LOAD_INITIAL_SCHOOLS, LOAD_INITIAL_STUDENTS } from './constants';

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

