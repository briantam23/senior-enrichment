import { expect } from 'chai';
import { createStore } from 'redux';
import { _createSchool } from '../src/store/actions/schools';
import { CREATE_SCHOOL } from '../src/store/constants';
import schoolsReducer from '../src/store/reducers/schools';

describe('The `School` Redux store', () => {

    const school = { 
        name: 'George Washington',
        description: 'GW',
        address: '231 Main Street, New York, NY 10007' 
    }

    describe('action creator', () => {

        it('returns properly formatted action', () => {

            expect(_createSchool(school)).to.be.deep.equal({
                type: CREATE_SCHOOL,
                schools: school
            })
        })
    })

    describe('schoolsReducer', () => {

        let testingStore;
        beforeEach('Create testing store from reducer', () => {
            testingStore = createStore(schoolsReducer);
        })

        it('has an initial state as an empty array', () => {

            const currentStoreState = testingStore.getState();

            expect(currentStoreState).to.be.deep.equal([]);
        })

        it('reduces on CREATE_SCHOOL (without mutating previous state)', () => {

            const prevState = testingStore.getState();

            testingStore.dispatch({
                type: CREATE_SCHOOL,
                schools: school
            })

            const newState = testingStore.getState();

            expect(newState.length).to.be.equal(prevState.length + 1);
            expect(newState[newState.length - 1]).to.be.deep.equal(school);
            expect(newState).to.not.be.equal(prevState);
        })

        it('handles unrecognized actions & returns the previous state', () => {

            const prevState = testingStore.getState();

            testingStore.dispatch({
                type: 'NOT_A_THING'
            })

            const newState = testingStore.getState();

            //these should be the same array in memory AND have equivalent key-value pairs
            expect(prevState).to.be.an('array');
            expect(newState).to.be.an('array');
            expect(newState).to.be.equal(prevState);
            expect(newState).to.be.deep.equal(prevState);
        })
    })
})