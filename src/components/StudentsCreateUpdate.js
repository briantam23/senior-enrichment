import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { createStudent, updateStudent, destroyStudent } from '../store/actions/students';

class StudentsCreateUpdate extends Component {
    constructor({ student }) {
        super();
        this.state = {
            firstName: student ? student.firstName : '',
            lastName: student ? student.lastName : '',
            GPA: 3.0,
            schoolName: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidUpdate(prevProps) {         //won't clear school after selecting student w/ school
        const { firstName, lastName, GPA } = this.props.student;
        //const { name } = this.props.school;
        if(prevProps.student !== this.props.student) {   
            this.setState({ 
                firstName, lastName, GPA//, schoolName: this.props.school.name 
            })
        }
    }
    handleChange(e) {
        this.setState({ [e.target.id]: e.target.value });
    }
    onSubmit(e) {
        const { updateStudent, id, history, createStudent } = this.props;
        e.preventDefault();
        id !== 'create'
        ? updateStudent({ ...this.state, id }, history)
        : createStudent(this.state, history)
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
            </Fragment>
        )
    }
}

const mapStateToProps = ({ schools, students }, { id, history }) => {
    let student = null; 
    let school = null;
    if(id !== 'create') {
        student = students.find(student => student.id === id*1); 
        school = schools.find(school => school.id === student.schoolId);
    }
    return({ student, school, id, schools, history });
}
const mapDispatchToProps = { createStudent, updateStudent, destroyStudent }

export default connect(mapStateToProps, mapDispatchToProps)(StudentsCreateUpdate);