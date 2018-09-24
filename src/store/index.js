import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { schoolsReducer, schoolReducer } from './reducers/schools';
import { studentsReducer, studentReducer } from './reducers/students';


const reducer = combineReducers({
    schools: schoolsReducer,
    school: schoolReducer,
    students: studentsReducer,
    student: studentReducer
})

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;