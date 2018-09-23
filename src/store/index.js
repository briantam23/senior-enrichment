import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import schools from './reducers/schools';
import students from './reducers/students';


const reducer = combineReducers({
    schools,
    students
})

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;