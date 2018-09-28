import { LOAD_INITIAL_SCHOOLS, CREATE_SCHOOL, UPDATE_SCHOOL, DESTROY_SCHOOL } from '../constants';


export const schoolsReducer = (state = [], action) => {
    switch(action.type) {
        case LOAD_INITIAL_SCHOOLS:
            return action.schools;
        case CREATE_SCHOOL:
            return [...state, action.schools]
        case UPDATE_SCHOOL:
            return state.map(school => school.id !== action.schools.id ? school : action.schools);
        case DESTROY_SCHOOL:
            return state.filter(school => school.id !== action.schools.id)
        default:
            return state;
    }
}