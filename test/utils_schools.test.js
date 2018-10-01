import { expect } from 'chai';
import sinon from 'sinon';
import { findSchoolByURL, sortSchools, sortStudents, selected } from '../src/utils';

describe('The JavaScript tests:', () => {

    const schools = [{ 
        name: 'George Washington',
        description: 'GW',
        address: '231 Main Street, New York, NY 10007',
        id: 1 
    },
    { 
        name: 'Cornwell',
        description: 'CW',
        address: '43 Stewart Avenue, Brooklyn, NY 11216',
        id: 2
    },
    { 
        name: 'West Hempstead',
        description: 'WH',
        address: '4 Linden Street, West Hempstead, NY 11552',
        id: 3 
    }]

    describe('findSchoolByURL function', () => {

        it('finds a school based on URL dynamic parameter', () => {
            
            expect(findSchoolByURL(schools, 2)).to.eql(schools[2 - 1]);
        })
    })

    describe('sortSchools function', () => {

        it('sorts schools by name', () => {

            expect(schools.sort((a, b) => sortSchools(a, b))).to.eql(
                [{ 
                    name: 'Cornwell',
                    description: 'CW',
                    address: '43 Stewart Avenue, Brooklyn, NY 11216',
                    id: 2
                },
                { 
                    name: 'George Washington',
                    description: 'GW',
                    address: '231 Main Street, New York, NY 10007',
                    id: 1 
                },
                { 
                    name: 'West Hempstead',
                    description: 'WH',
                    address: '4 Linden Street, West Hempstead, NY 11552',
                    id: 3 
                }]
            )
        })
    })
    
    describe('sortStudents function', () => {

        const unrelatedStudents = [{
            lastName: 'Johnson',
            firstName: 'Mark'
        },
        {
            lastName: 'Bagner',
            firstName: 'Tim'
        },
        {
            lastName: 'Wagner',
            firstName: 'Bob'
        }]

        const relatedStudents = [{
            lastName: 'Wagner',
            firstName: 'Bob'
        },
        {
            lastName: 'Wagner',
            firstName: 'Adam'
        },
        {
            lastName: 'Johnson',
            firstName: 'Mark'
        }]

        it('sorts by last name first', () => {

            expect(unrelatedStudents.sort((a, b) => sortStudents(a, b))).to.eql(
                [{
                    lastName: 'Bagner',
                    firstName: 'Tim'
                },
                {
                    lastName: 'Johnson',
                    firstName: 'Mark'
                },
                {
                    lastName: 'Wagner',
                    firstName: 'Bob'
                }]
            )
        })

        it('if same last names, it then sorts by first name', () => {

            expect(relatedStudents.sort((a, b) => sortStudents(a, b))).to.eql(
                [{
                    lastName: 'Johnson',
                    firstName: 'Mark'
                },
                {
                    lastName: 'Wagner',
                    firstName: 'Adam'
                },
                {
                    lastName: 'Wagner',
                    firstName: 'Bob'
                }]
            )
        })
    })

    describe('selected function', () => {

        it('returns a style with a fontWeight property of bold if its pathname is selected', () => {

            expect(selected('/schools', '/schools', true)).to.eql({ fontWeight: 'bold' });
            expect(selected('/schools', '/', true)).to.eql({});
        })

        it('schools will be bolded if it is somewhere on the `schools` route', () => {

            expect(selected('/schools', '/schools/:id', true)).to.eql({ fontWeight: 'bold' });
            expect(selected('/schools', '/students', true)).to.eql({});
        })

        it('home route will only be bolded on its exact route', () => {

            expect(selected('/', '/schools')).to.eql({});
            expect(selected('/', '/')).to.eql({ fontWeight: 'bold' });
        })
    })
})