import axios from "axios";
import { LOAD_INITIAL_SCHOOLS, CREATE_SCHOOL, UPDATE_SCHOOL, DESTROY_SCHOOL, UPDATE_STUDENT } from '../constants';
import { updateStudent } from './students';
import { findStudentsBySchool } from '../../utils';

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

export const _createSchool = school => ({
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
export const destroySchool = (school, history, students, redirectToStudents) => { 
    students = findStudentsBySchool(students, school);
    return dispatch => (
        axios.delete(`/api/schools/${school.id}`)
            .then(() => dispatch(_destroySchool(school))) 
            .then(() => {
                if(students) {
                    students.forEach(student => (
                        dispatch(updateStudent({ ...student, schoolId: null } , history, redirectToStudents))))
                }
            })
            .then(() => {
                if(history) history.push('/schools');
            })
    )
}