import { LOAD_INITIAL_STUDENTS } from '../constants';


const studentsReducer = (state = [], action) => {
    switch(action.type) {
        case LOAD_INITIAL_STUDENTS:
            return action.students;
        default:
            return state;
    }
}

export default studentsReducer;