import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { createStudent, updateStudent, destroyStudent } from '../store/actions/students';
import { findStudentByURL, findSchoolByStudent, findSchoolByName, findSchoolByURL } from '../utils';

class StudentsCreateUpdate extends Component {
    constructor({ student, schoolName, schoolId }) {
        super();
        this.state = {
            firstName: student ? student.firstName : '',
            lastName: student ? student.lastName : '',
            GPA: 3.0,
            schoolName: (student && student.schoolId) || schoolId ? schoolName : ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidUpdate(prevProps) {
        const { student } = this.props;
        if(prevProps !== this.props) this.setState({ student });
    }
    handleChange(e) {
        this.setState({ [e.target.id]: e.target.value });
    }
    onSubmit(e) {
        const { updateStudent, studentId, history, createStudent, schools } = this.props;
        const { firstName, lastName, GPA, schoolName } = this.state;
        let selectedSchool = null;
        if(schoolName) selectedSchool = findSchoolByName(schools, schoolName);
        e.preventDefault();
        studentId !== 'create'
        ? updateStudent({ firstName, lastName, GPA, schoolId: selectedSchool ? selectedSchool.id : null, id: studentId }, history)
        : createStudent({ firstName, lastName, GPA, schoolId: selectedSchool ? selectedSchool.id : null }, history)
    }
    render() {
        const { student, schools, destroyStudent, history } = this.props;
        const { firstName, lastName, GPA, schoolName } = this.state;
        const { handleChange, onSubmit } = this;
        return(
            <Fragment>
                <h2>Student</h2>
                { student ? <h5>{ student.name }</h5> : null }
                <form onSubmit={ onSubmit }>
                    <label htmlFor='firstName'>First Name: </label>
                        <input onChange={ handleChange } value={ firstName } id='firstName'></input>
                        <br/>
                    <label htmlFor='lastName'>Last Name: </label>
                        <input onChange={ handleChange } value={ lastName } id='lastName'></input>
                        <br/>
                    <label htmlFor='GPA'>GPA: </label>
                        <input onChange={ handleChange } value={ GPA } id='GPA'></input>
                        <br/>
                    <label htmlFor='schoolName'>School: </label>
                        <select onChange={ handleChange } value={ schoolName }  id='schoolName'>
                            <option>--None--</option>
                        {
                            schools.map(school => (
                                <option key={ school.id }>
                                    { school.name }
                                </option>))
                        }
                        </select>
                        <br/>
                    <button disabled={ !firstName || !lastName || !GPA }>Save</button>
                </form>
                    <button onClick={ () => destroyStudent(student, history) }>Delete</button>
                <br/>
                <button onClick={ () => history.goBack() }>Back</button>
            </Fragment>
        )
    }
}

const mapStateToProps = ({ schools, students }, { studentId, history, schoolId }) => { 
    let student = null; 
    let schoolName = null;
    if(studentId !== 'create') {                                // if(editForm) pre-populate info
        student = findStudentByURL(students, studentId);
        if(student && student.schoolId) schoolName = findSchoolByStudent(schools, student).name;
    }
    if(schoolId) schoolName = findSchoolByURL(schools, schoolId).name;  // if(coming from school page) pre-populate info
    return({ student, studentId, schools, history, schoolId, schoolName });
}
const mapDispatchToProps = { createStudent, updateStudent, destroyStudent }

export default connect(mapStateToProps, mapDispatchToProps)(StudentsCreateUpdate);