import { LOAD_INITIAL_SCHOOLS, DESTROY_SCHOOL } from '../constants';


const schoolsReducer = (state = [], action) => {
    switch(action.type) {
        case LOAD_INITIAL_SCHOOLS:
            return action.schools;
        case DESTROY_SCHOOL:
            return state.filter(school => school.id !== action.schools.id)
        default:
            return state;
    }
}

export default schoolsReducer;