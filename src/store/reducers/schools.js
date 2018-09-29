import { LOAD_INITIAL_SCHOOLS, CREATE_SCHOOL, UPDATE_SCHOOL, DESTROY_SCHOOL } from '../constants';
import { sortSchools } from '../../utils';


export const schoolsReducer = (state = [], action) => {
    switch(action.type) {
        case LOAD_INITIAL_SCHOOLS:
            return action.schools.sort((a, b) => sortSchools(a, b));
        case CREATE_SCHOOL:
            return [...state, action.schools].sort((a, b) => sortSchools(a, b));
        case UPDATE_SCHOOL:
            return state.map(school => school.id !== action.schools.id ? school : action.schools).sort((a, b) => sortSchools(a ,b));
        case DESTROY_SCHOOL:
            return state.filter(school => school.id !== action.schools.id)
        default:
            return state;
    }
}