import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { createSchool, updateSchool, destroySchool } from '../store/actions/schools';
import { updateStudent, destroyStudent } from '../store/actions/students';

class SchoolsCreateUpdate extends Component {
    constructor({ school }) {
        super();
        this.state = {
            name: school ? school.name : '',
            description: school ? school.description : '',
            address: school ? school.address : ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCreate = this.onCreate.bind(this);
        this.onStudentSubmit = this.onStudentSubmit.bind(this);
    }
    componentDidUpdate(prevProps) {
        const { school, id } = this.props;
        if(prevProps !== this.props) { // why not !prevProps.school && this.props.school
            id !== 'create' 
            ? this.setState(school)
            : this.setState({ name: '', description: '', address: '' })
        }
    }
    handleChange(e) {
        this.setState({ [e.target.id]: e.target.value });
    }
    onSubmit(e) {
        e.preventDefault();
        const { id, history, createSchool, updateSchool } = this.props;
        id !== 'create' 
        ? updateSchool({ ...this.state, id }, history)
        : createSchool(this.state, history)
    }
    onCreate(e) {
        e.preventDefault();
        this.props.history.push('/students/create');
    }
    onStudentSubmit(e) {
        const { updateStudent } = this.props;
        e.preventDefault();
        
    }
    render() {
        const { school, id, destroySchool, history, enrolledStudents, destroyStudent, unenrolledStudents } = this.props;
        const { handleChange, onSubmit, onCreate, onStudentSubmit } = this;
        const { name, description, address } = this.state;
        return(
            <Fragment>
                <h2>School</h2>
                {
                    school ? <h5>{ school.name }</h5> : null
                }
                <form onSubmit={ onSubmit }>
                    <label htmlFor='name'>Name: </label>
                        <input onChange={ handleChange } value={ name } id='name'></input>
                        <br/>
                    <label htmlFor='description'>Description: </label>
                        <input onChange={ handleChange } value={ description } id='description'></input>
                        <br/>
                    <label htmlFor='address'>Address: </label>
                        <input onChange={ handleChange } value={ address }></input>
                        <br/>
                    <button disabled={ !name || !description || !address }>Save</button>
                </form>
                {
                    id !== 'create' ? (
                    <Fragment>
                        <br/>
                        <button onClick={ () => destroySchool(school, history) }>Delete</button>
                        <button onClick={ (e) => onCreate(e) }>Add new student</button>
                        <br/>
                        <br/>
                        <h4>Add new student</h4>
                        <ul>
                        {
                            enrolledStudents.map(enrolledStudent => (
                                <li key={ enrolledStudent.id }>
                                    { enrolledStudent.lastName + ', ' + enrolledStudent.firstName }
                                    <button onClick={ () => destroyStudent(enrolledStudent, history) }>X</button>
                                </li>))
                        }
                        </ul>
                        <form onSubmit={ onStudentSubmit }>
                            <select>
                                <option>--Select Student--</option>
                            {
                                unenrolledStudents.map(unenrolledStudent => (
                                    <option key={ unenrolledStudent.id }>
                                        { unenrolledStudent.lastName + ' ' + unenrolledStudent.firstName }
                                    </option>
                                ))
                            }
                            </select>
                            <button>+</button>
                        </form>
                    </Fragment>
                    ): null 
                }
            </Fragment>
        )
    }
}

const mapStateToProps = ({ students, schools }, { id, history }) => {
    const enrolledStudents = students.filter(student => student.schoolId === id*1);
    const unenrolledStudents = students.filter(student => student.schoolId !== id*1);
    const school = schools.find(school => school.id === id*1);
    return({
        school, 
        id, 
        history, 
        enrolledStudents,
        unenrolledStudents 
    })
}

const mapDispatchToProps = { createSchool, updateSchool, destroySchool, updateStudent, destroyStudent };

export default connect(mapStateToProps, mapDispatchToProps)(SchoolsCreateUpdate);

