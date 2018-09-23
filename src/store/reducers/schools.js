import { LOAD_INITIAL_SCHOOLS } from '../constants';




const school = (state = [], action) => {
    switch(action.type) {
        case LOAD_INITIAL_SCHOOLS:
            return action.schools;
        default:
            return state;
    }
}

export default school;