import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { schoolsReducer} from './reducers/schools';
import { studentsReducer } from './reducers/students';


const reducer = combineReducers({
    schools: schoolsReducer,
    students: studentsReducer
})

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;