import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { createSchool, updateSchool, destroySchool } from '../store/actions/schools';
import { updateStudent } from '../store/actions/students';
import { enrolled, unenrolled, findSchoolByURL, findStudentByName } from '../utils';
import { Button } from 'reactstrap';


export class SchoolsCreateUpdate extends Component {
    constructor({ school }) {
        super();
        this.state = {
            name: school ? school.name : '',
            description: school ? school.description : '',
            address: school ? school.address : '',
            studentName: '',
            error: ''
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
        const { id, history, createSchool, updateSchool } = this.props;
        const { name, description, address } = this.state;
        e.preventDefault();
        id !== 'create' 
        ? updateSchool({ name, description, address, id }, history)
            .catch(() => this.setState({ error: 'Error! Name and/or address taken. Please try again.' }))
        : createSchool({ name, description, address }, history)
            .catch(() => this.setState({ error: 'Error! Name and/or address taken. Please try again.'}))
    }
    onStudentSubmit(e) {
        const { updateStudent, unenrolledStudents, id, history } = this.props;
        const { studentName } = this.state;
        e.preventDefault();
        const selectedStudent = findStudentByName(unenrolledStudents, studentName);
        updateStudent({ ...selectedStudent, schoolId: id*1 }, history, false);
    }
    render() {
        const { school, id, destroySchool, history, enrolledStudents, unenrolledStudents, updateStudent, students } = this.props;
        const { handleChange, onSchoolSubmit, onStudentSubmit } = this;
        const { name, description, address, studentName, error } = this.state;
        return(
            <Fragment>
                <h2>School</h2>
            {
                school ? <h3>{ school.name }</h3> : null
            }
                <hr/>
                { error ? <div className='error-message'>{ error }</div> : null }
                <form onSubmit={ onSchoolSubmit }>
                    <label htmlFor='name'>Name: </label>
                        <input onChange={ handleChange } value={ name } id='name' placeholder='Name' autoFocus required></input>
                        <br/>
                    <label htmlFor='description'>Description: </label>
                        <input onChange={ handleChange } value={ description } id='description' placeholder='Description'></input>
                        <br/>
                    <label htmlFor='address'>Address: </label>
                        <input onChange={ handleChange } value={ address } id='address' placeholder='Address' size= '40' required></input>
                        <br/>
                {
                    school ? (
                        <button disabled={
                            (name === school.name && description === school.description && address === school.address) }>Save</button>
                    ) : <button>Save</button>
                }    
                </form>
                {
                    id !== 'create' ? (
                    <Fragment>
                        <Button onClick={ () => destroySchool(school, history, students, false) } color='danger'>Delete</Button>
                        <hr/>
                        { enrolledStudents.length > 0 ? <h4>Enrolled students</h4> : null }
                        <ul>
                        {
                            enrolledStudents.map(enrolledStudent => (
                                <li key={ enrolledStudent.id }>
                                    { enrolledStudent.lastName + ', ' + enrolledStudent.firstName }
                                    <button onClick={ () => updateStudent({ ...enrolledStudent, schoolId: null }, history, false) }>X</button>
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
                            <button disabled={ !studentName }>Enroll</button>
                        </form>
                        <hr/>
                        <button onClick={ () => history.push(`/students/create/${id}`) }>Enroll new student</button>
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

