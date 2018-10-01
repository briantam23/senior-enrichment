import React from 'react';
import { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { spy } from 'sinon';

const adapter = new Adapter();
Enzyme.configure({ adapter });


import { Schools } from '../src/components/Schools';
import { SchoolsCreateUpdate } from '../src/components/SchoolsCreateUpdate';


describe('The `School` React Components:', () => {

    let schools, students, enrolledStudents, unenrolledStudents;

    schools = [{ 
        name: 'George Washington',
        description: 'GW',
        address: '231 Main Street, New York, NY 10007' 
    },
    { 
        name: 'Cornwell',
        description: 'CW',
        address: '43 Stewart Avenue, Brooklyn, NY 11216'
    },
    { 
        name: 'West Hempstead',
        description: 'WH',
        address: '4 Linden Street, West Hempstead, NY 11552' 
    },
    { 
        name: 'Island Park',
        description: 'IP',
        address: '33 Ocean Drive, Island Park, NY 11558' 
    }]

    students = [
    {
        id: 3,
        lastName: "Chan",
        firstName: "Robby",
        GPA: "3.5",
        createdAt: "2018-10-01T14:35:05.628Z",
        updatedAt: "2018-10-01T14:35:05.628Z",
        schoolId: null
    },
    {
        id: 5,
        lastName: "Johnson",
        firstName: "Johnny",
        GPA: "3.0",
        createdAt: "2018-10-01T14:35:05.628Z",
        updatedAt: "2018-10-01T14:35:05.628Z",
        schoolId: null
    },
    {
        id: 2,
        lastName: "Smith",
        firstName: "Jamel",
        GPA: "3.1",
        createdAt: "2018-10-01T14:35:05.627Z",
        updatedAt: "2018-10-01T14:35:05.750Z",
        schoolId: 2
    },
    {
        id: 1,
        lastName: "Brown",
        firstName: "Mike",
        GPA: "2.8",
        createdAt: "2018-10-01T14:35:05.624Z",
        updatedAt: "2018-10-01T14:35:05.749Z",
        schoolId: 3
    },
    {
        id: 4,
        lastName: "Peters",
        firstName: "Brian",
        GPA: "3.5",
        createdAt: "2018-10-01T14:35:05.628Z",
        updatedAt: "2018-10-01T14:35:05.750Z",
        schoolId: 2
    }]

    unenrolledStudents = [{
        id: 1,
        lastName: "Brown",
        firstName: "Mike",
        GPA: "2.8",
        createdAt: "2018-10-01T14:35:05.624Z",
        updatedAt: "2018-10-01T14:35:05.749Z",
        schoolId: 3
    },
    {
        id: 4,
        lastName: "Peters",
        firstName: "Brian",
        GPA: "3.5",
        createdAt: "2018-10-01T14:35:05.628Z",
        updatedAt: "2018-10-01T14:35:05.750Z",
        schoolId: 2
    }]
    enrolledStudents = [];


    describe('<Schools /> component', () => {   
        let schoolsWrapper;

        beforeEach('Create component', () => {
            
            // 'shallow' is a method provided by the enzyme library.
            // It performs a 'virtual render', the component, just as if a parent component had rendered it (or just as if
            // we passed it to ReactDOM.render). However, it doesn't render to the real DOM. Instead, it returns a 'wrapper.'
            // This 'wrapper' object contains information about what the rendered component would look like, and provides
            // useful methods for testing it.

            schoolsWrapper = shallow(<Schools schools={ schools } students={ students } />);

        })

        it('renders a <li> for each school', () => {
            
            expect(schoolsWrapper.find('li').length).to.be.equal(schools.length);
        })

        it('renders a <button> within the <li> for each school', () => {

            expect(schoolsWrapper.find('li').find('button').length).to.be.equal(schools.length);
        })
    })

    describe('<SchoolsCreateUpdate />', () => {
        let schoolsCreateUpdateWrapper, destroySchoolSpy;

        beforeEach('Create Component', () => {
            destroySchoolSpy = spy();

            schoolsCreateUpdateWrapper = shallow(<SchoolsCreateUpdate schools={ schools } students={ students } 
                enrolledStudents={ enrolledStudents } unenrolledStudents={ unenrolledStudents } 
                destroySchool={ destroySchoolSpy } />)
        })

        it('renders an <option> element for each unenrolled student', () => {

            expect(schoolsCreateUpdateWrapper.find('select').find('option').length).to.be.equal(unenrolledStudents.length + 1); // additional for default option
        })

        it('when clicked, invokes a function passed in', () => {

            // The function passed into button should not be called immediately.
            expect(destroySchoolSpy).not.to.have.been.called;

            //This will trigger any onClick handlers registered to the component.
            schoolsCreateUpdateWrapper.find('button').at(1).simulate('click');

            expect(destroySchoolSpy).to.have.been.called;
        })
    })
})