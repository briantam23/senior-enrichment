import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { createSchool, updateSchool, destroySchool } from '../store/actions/schools';
import { updateStudent } from '../store/actions/students';
import { enrolled, unenrolled, findSchoolByURL, findStudentByName } from '../utils';

class SchoolsCreateUpdate extends Component {
    constructor({ school }) {
        super();
        this.state = {
            name: school ? school.name : '',
            description: school ? school.description : '',
            address: school ? school.address : '',
            studentName: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.onSchoolSubmit = this.onSchoolSubmit.bind(this);
        this.onStudentSubmit = this.onStudentSubmit.bind(this);
    }
    componentDidUpdate(prevProps) {
        const { school, id } = this.props;
        if(prevProps !== this.props) {
            id !== 'create' ? this.setState({ ...school, studentName: '' }) : null
        }
    }
    handleChange(e) {
        this.setState({ [e.target.id]: e.target.value });
    }
    onSchoolSubmit(e) {
        e.preventDefault();
        const { id, history, createSchool, updateSchool } = this.props;
        id !== 'create' 
        ? updateSchool({ ...this.state, id }, history)
        : createSchool(this.state, history)
    }
    onStudentSubmit(e) {
        const { updateStudent, unenrolledStudents, id, history } = this.props;
        const { studentName } = this.state;
        e.preventDefault();
        const selectedStudent = findStudentByName(unenrolledStudents, studentName);
        updateStudent({ ...selectedStudent, schoolId: id*1 }, history, id);
    }
    render() {
        const { school, id, destroySchool, history, enrolledStudents, unenrolledStudents, updateStudent, students } = this.props;
        const { handleChange, onSchoolSubmit, onStudentSubmit } = this;
        const { name, description, address, studentName } = this.state;
        return(
            <Fragment>
                <h2>School</h2>
                {
                    school ? <h5>{ school.name }</h5> : null
                }
                <form onSubmit={ onSchoolSubmit }>
                    <label htmlFor='name'>Name: </label>
                        <input onChange={ handleChange } value={ name } id='name'></input>
                        <br/>
                    <label htmlFor='description'>Description: </label>
                        <input onChange={ handleChange } value={ description } id='description'></input>
                        <br/>
                    <label htmlFor='address'>Address: </label>
                        <input onChange={ handleChange } value={ address } id='address'></input>
                        <br/>
                    <button disabled={ !name || !description || !address }>Save</button>
                </form>
                {
                    id !== 'create' ? (
                    <Fragment>
                        <br/>
                        <button onClick={ () => destroySchool(school, history, students, id) }>Delete</button>
                        <button onClick={ () => history.push(`/students/create/${id}`) }>Enroll new student</button>
                        <br/>
                        <br/>
                        <h4>Enroll existing student</h4>
                        <ul>
                        {
                            enrolledStudents.map(enrolledStudent => (
                                <li key={ enrolledStudent.id }>
                                    { enrolledStudent.lastName + ', ' + enrolledStudent.firstName }
                                    <button onClick={ () => updateStudent({ ...enrolledStudent, schoolId: null }, history, id) }>X</button>
                                </li>))
                        }
                        </ul>
                        <form onSubmit={ onStudentSubmit }>
                            <select onChange={ handleChange } value={ studentName } id='studentName'>
                                <option>--Select Student--</option>
                            {
                                unenrolledStudents.map(unenrolledStudent => (
                                    <option key={ unenrolledStudent.id }>
                                        { unenrolledStudent.lastName + ', ' + unenrolledStudent.firstName }
                                    </option>
                                ))
                            }
                            </select>
                            <button disabled={ !studentName }>+</button>
                        </form>
                        <br/>
                        <button onClick={ () => history.goBack() }>Back</button>
                    </Fragment>
                    ): null 
                }
            </Fragment>
        )
    }
}

const mapStateToProps = ({ students, schools }, { id, history }) => {
    const enrolledStudents = enrolled(students, id);
    const unenrolledStudents = unenrolled(students, id);
    const school = findSchoolByURL(schools, id);
    return({ school, id, history, enrolledStudents, unenrolledStudents, students });
}

const mapDispatchToProps = { createSchool, updateSchool, destroySchool, updateStudent };

export default connect(mapStateToProps, mapDispatchToProps)(SchoolsCreateUpdate);

