import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { createSchool, updateSchool, destroySchool } from '../store/actions/schools';
import { updateStudent } from '../store/actions/students';
import { enrolled, unenrolled, findSchoolByURL, findStudentByName } from '../utils';
import { Button, Table } from 'reactstrap';


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
                school ? ( 
                        <Fragment>
                            <hr/>
                            <h3>{ school.name }</h3>
                        </Fragment> ) : null
            }
                <hr/>
                { error ? <div className='error-message'>{ error }</div> : null }
                <form onSubmit={ onSchoolSubmit }>
                    <label htmlFor='name'>Name: </label> &emsp;
                        <input onChange={ handleChange } value={ name } id='name' placeholder='Name' size= '40' style={{ float: 'right' }} autoFocus required></input>
                        <br/>
                    <label htmlFor='description'>Description: </label> &emsp;
                        <input onChange={ handleChange } value={ description } id='description' placeholder='Description' size= '40' style={{ float: 'right' }}></input>
                        <br/>
                    <label htmlFor='address'>Address: </label> &emsp;
                        <input onChange={ handleChange } value={ address } id='address' placeholder='Address' size= '40' style={{ float: 'right' }} required></input>
                        <br/><br/>
                {
                    school ? (
                        <Button disabled={
                            (name === school.name && description === school.description && address === school.address) } 
                            color='success' block>
                            Save
                        </Button>
                    ) : <Button color='success' block>Save</Button>
                }    
                </form>
                {
                    id !== 'create' ? (
                    <Fragment>
                        <Button onClick={ () => destroySchool(school, history, students, false) } color='danger' block>Delete</Button>
                        <hr/>
                        { enrolledStudents.length > 0 ? <h4>Enrolled students</h4> : null }
                        <Table striped dark>
                            <thead>
                                <tr>
                                    <th>Student Name</th>
                                    <th>GPA</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                enrolledStudents.map(enrolledStudent => (
                                    <tr key={ enrolledStudent.id }>
                                        <td>
                                            { enrolledStudent.lastName + ', ' + enrolledStudent.firstName }
                                        </td>
                                        <td>
                                            { enrolledStudent.GPA }
                                        </td>
                                        <td>
                                            <Button onClick={ () => updateStudent({ ...enrolledStudent, schoolId: null }, history, false) } color='danger' style={{ float: 'right' }}>X</Button>
                                        </td>
                                    </tr>))
                            }
                            </tbody>
                        </Table>
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
                            </select> &emsp;
                            <Button disabled={ !studentName } color='success'>Enroll</Button>
                        </form>
                        <hr/>
                        <Button onClick={ () => history.push(`/students/create/${id}`) } color='success' block>Enroll new student</Button>
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

