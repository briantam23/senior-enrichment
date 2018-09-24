import { LOAD_INITIAL_STUDENTS, FETCH_STUDENT } from '../constants';


export const studentsReducer = (state = [], action) => {
    switch(action.type) {
        case LOAD_INITIAL_STUDENTS:
            return action.students;
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