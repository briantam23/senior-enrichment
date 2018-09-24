import axios from "axios";
import { LOAD_INITIAL_SCHOOLS, FETCH_SCHOOL, CREATE_SCHOOL, UPDATE_SCHOOL, DESTROY_SCHOOL } from '../constants';

const _loadInitialSchools = schools => ({
    type: LOAD_INITIAL_SCHOOLS,
    schools
})
export const loadInitialSchools = () => (
    dispatch => (
        axios.get('/api/schools')
            .then(res => res.data)
            .then(schools => dispatch(_loadInitialSchools(schools)))
    )
)

const _fetchSchool = school => ({
    type: FETCH_SCHOOL,
    school
})
export const fetchSchool = id => (
    dispatch => (
        axios.get(`/api/schools/${id}`)
            .then(res => res.data)
            .then(school => dispatch(_fetchSchool(school)))
    )
)

const _createSchool = school => ({
    type: CREATE_SCHOOL,
    schools: school
})
export const createSchool = (school, history) => (
    dispatch => (
        axios.post('/api/schools', school)
            .then(res => res.data)
            .then(_school => dispatch(_createSchool(_school)))
            .then(() => history.push('/schools'))
    )
)

const _updateSchool = school => ({
    type: UPDATE_SCHOOL,
    schools: school
})
export const updateSchool = (school, history) => (
    dispatch => (
        axios.put(`/api/schools/${school.id}`, school)
            .then(res => res.data)
            .then(_school => dispatch(_updateSchool(_school)))
            .then(() => history.push('/schools'))
    )
)
const _destroySchool = school => ({
    type: DESTROY_SCHOOL,
    schools: school
})
export const destroySchool = (school, history) => (
    dispatch => (
        axios.delete(`/api/schools/${school.id}`)
            .then(() => dispatch(_destroySchool(school)))
            .then(() => history.push('/schools'))
    )
)