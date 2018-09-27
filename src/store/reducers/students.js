import { LOAD_INITIAL_STUDENTS, FETCH_STUDENT, CREATE_STUDENT, UPDATE_STUDENT, DESTROY_STUDENT } from '../constants';


export const studentsReducer = (state = [], action) => {
    switch(action.type) {
        case LOAD_INITIAL_STUDENTS:
            return action.students;
        case CREATE_STUDENT:
            return [...state, action.students];
        case UPDATE_STUDENT:
            return state.map(student => student.id !== action.students.id ? student : action.students);
        case DESTROY_STUDENT:
            return state.filter(student => student.id !== action.students.id)
        default:
            return state;
    }
}

export const studentReducer = (state = {}, action) => {
    switch(action.type) {
        case FETCH_STUDENT:
            return action.student;
        default:
            return state;
    }
}