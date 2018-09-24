import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchStudent } from '../store/actions/students';
import { fetchSchool } from '../store/actions/schools';

class StudentsCreateUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            GPA: 3.0,
            school: ''
        }
        this.handleFNameChange = this.handleFNameChange.bind(this);
        this.handleLNameChange = this.handleLNameChange.bind(this);
        this.handleGPAChange = this.handleGPAChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        const { fetchStudent, id, fetchSchool, student } = this.props;
        fetchStudent(id)
            /* .then(student => {
                student.schoolId ? fetchSchool(student.schoolId) : null
            })
            .then(school => this.setState({ school: school.name })) 
            console.log(student.schoolId)
            student.schoolId ? fetchSchool(student.schoolId) : null */
    }
    componentDidUpdate(prevProps) {
        if(prevProps !== this.props) {
            this.setState(this.props.student);
            //this.props.student.schoolId ? this.props.fetchSchool(this.props.student.schoolId) : null;
        }
    }
    handleFNameChange(e) {
        this.setState({ firstName: e.target.value });
    }
    handleLNameChange(e) {
        this.setState({ lastName: e.target.value });
    }
    handleGPAChange(e) {
        this.setState({ GPA: e.target.value });
    }
    onSubmit(e) {

    }
    render() {
        const { student } = this.props;
        const { firstName, lastName, GPA, school } = this.state;
        const { handleFNameChange, handleLNameChange, handleGPAChange, onSubmit } = this;
        return(
            <Fragment>
                <h2>Student</h2>
                <h5>{ student.name }</h5>
                <form onSubmit={ onSubmit }>
                    <label htmlFor='firstName'>First Name: </label>
                        <input onChange={ handleFNameChange } value={ firstName } id='firstName'></input>
                        <br/>
                    <label htmlFor='lastName'>Last Name: </label>
                        <input onChange={ handleLNameChange } value={ lastName } id='lastName'></input>
                        <br/>
                    <label htmlFor='GPA'>GPA: </label>
                        <input onChange={ handleGPAChange } value={ GPA } id='GPA'></input>
                        <br/>
                    <label htmlFor='school'>School: </label>
                        <select /* value={ school }  */id='school'>School</select>
                        <br/>
                    <button disabled={ !firstName || !lastName || !GPA }>Save</button>
                    <button>Delete</button>
                </form>
            </Fragment>
        )
    }
}

const mapStateToProps = ({ student, school }, { id }) => ({ student, school, id });
const mapDispatchToProps = { fetchStudent, fetchSchool }

export default connect(mapStateToProps, mapDispatchToProps)(StudentsCreateUpdate);