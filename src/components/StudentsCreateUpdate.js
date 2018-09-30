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
            GPA: student ? student.GPA : 3.3,
            schoolName: (student && student.schoolId) || schoolId ? schoolName : '',
            error: ''
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
        studentId === 'create' || !studentId
        ? createStudent({ firstName, lastName, GPA, schoolId: selectedSchool ? selectedSchool.id : null }, history)
            .catch(() => this.setState({ error: 'Error! Invalid GPA. Please try again.' }))
        : updateStudent({ firstName, lastName, GPA, schoolId: selectedSchool ? selectedSchool.id : null, id: studentId }, history, true)
            .catch(() => this.setState({ error: 'Error! Invalid GPA. Please try again.' }))
    }
    render() {
        const { student, schools, destroyStudent, history, studentId, schoolId } = this.props;
        const { firstName, lastName, GPA, schoolName, error } = this.state;
        const { handleChange, onSubmit } = this;
        return(
            <Fragment>
                <h2>Student</h2>
                { student ? <h5>{ student.name }</h5> : null }
                { error ? <div className='error-message'>{ error }</div> : null }
                <form onSubmit={ onSubmit }>
                    <label htmlFor='firstName'>First Name: </label>
                        <input onChange={ handleChange } value={ firstName } id='firstName' placeholder='First Name' autoFocus></input>
                        <br/>
                    <label htmlFor='lastName'>Last Name: </label>
                        <input onChange={ handleChange } value={ lastName } id='lastName' placeholder='Last Name'></input>
                        <br/>
                    <label htmlFor='GPA'>GPA: </label>
                        <input onChange={ handleChange } value={ GPA } id='GPA' placeholder='GPA'></input>
                        <br/>
                    <label htmlFor='schoolName'>School: </label>
                        <select onChange={ handleChange } value={ schoolName } id='schoolName'>
                            <option>--None--</option>
                        {
                            schools.map(school => (
                                <option key={ school.id }>
                                    { school.name }
                                </option>))
                        }
                        </select>
                        <br/>
                    {
                        student ? (
                            <button disabled={ (!firstName || !lastName || !GPA) || 
                                (firstName === student.firstName && lastName === student.lastName 
                                && GPA === student.GPA && schoolName === this.props.schoolName) }>Save</button>
                        ) : <button disabled={ (!firstName || !lastName || !GPA) }>Save</button>
                    }
                </form>
                { studentId !== 'create' && !schoolId ? <button onClick={ () => destroyStudent(student, history) }>Delete</button> : null }
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