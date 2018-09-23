import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import school from './reducers/schools';
import student from './reducers/students';

const reducer = combineReducers({
    school,
    student
})

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;