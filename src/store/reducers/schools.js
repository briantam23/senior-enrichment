import { LOAD_INITIAL_SCHOOLS } from '../constants';


const schoolsReducer = (state = [], action) => {
    switch(action.type) {
        case LOAD_INITIAL_SCHOOLS:
            return action.schools;
        default:
            return state;
    }
}

export default schoolsReducer;