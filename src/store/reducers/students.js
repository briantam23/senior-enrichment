import { LOAD_INITIAL_STUDENTS, CREATE_STUDENT, UPDATE_STUDENT, DESTROY_STUDENT } from '../constants';


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