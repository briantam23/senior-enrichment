import { LOAD_INITIAL_STUDENTS, CREATE_STUDENT, UPDATE_STUDENT, DESTROY_STUDENT } from '../constants';
import { sortStudents } from '../../utils';


const studentsReducer = (state = [], action) => {
    switch(action.type) {
        case LOAD_INITIAL_STUDENTS:
            return action.students.sort((a, b) => sortStudents(a, b));
        case CREATE_STUDENT:
            return [...state, action.students].sort((a, b) => sortStudents(a, b));
        case UPDATE_STUDENT:
            return state.map(student => student.id !== action.students.id ? student : action.students).sort((a, b) => sortStudents(a , b));
        case DESTROY_STUDENT:
            return state.filter(student => student.id !== action.students.id)
        default:
            return state;
    }
}

export default studentsReducer;