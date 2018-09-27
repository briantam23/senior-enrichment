import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchStudent, createStudent, updateStudent, destroyStudent } from '../store/actions/students';
import { fetchSchool } from '../store/actions/schools';

class StudentsCreateUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            GPA: 3.0,
            schoolName: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        const { fetchStudent, id, fetchSchool, student } = this.props;
        id !== 'create' ? fetchStudent(id) : null  
    }
    componentDidUpdate(prevProps) {         //won't clear school after selecting student w/ school
        const { student, school } = this.props;
        //console.log(school)
        if(prevProps !== this.props) {
            this.setState({ 
                firstName: student.firstName, lastName: student.lastName, GPA: student.GPA , schoolName: school.name 
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
                <h5>{ student.name }</h5>
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

const mapStateToProps = ({ student, school, schools }, { id, history }) => { 
    //const student = students.find(_student => _student.id === id); ///////////////////////
    return({
        student, 
        school, 
        id, 
        schools, 
        history 
    })
}
const mapDispatchToProps = { fetchStudent, fetchSchool, createStudent, updateStudent, destroyStudent }

export default connect(mapStateToProps, mapDispatchToProps)(StudentsCreateUpdate);