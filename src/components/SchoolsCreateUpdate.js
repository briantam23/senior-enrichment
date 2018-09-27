import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchSchool, createSchool, updateSchool, destroySchool } from '../store/actions/schools';
import { updateStudent, destroyStudent } from '../store/actions/students';

class SchoolsCreateUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            address: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCreate = this.onCreate.bind(this);
        this.onStudentSubmit = this.onStudentSubmit.bind(this);

        const { id, fetchSchool } = this.props;
        if(id !== 'create') fetchSchool(id); //componentDidMount instead? or Prof's way
    }
    componentDidUpdate(prevProps) {
        const { school, id } = this.props;
        if(prevProps !== this.props) {
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
                    id !== 'create' ? <h5>{ school.name }</h5> : null
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

const mapStateToProps = ({ school, students }, { id, history }) => {
    const enrolledStudents = students.filter(student => student.schoolId === id*1);
    const unenrolledStudents = students.filter(student => student.schoolId !== id*1);
    return({
        school, 
        id, 
        history, 
        enrolledStudents,
        unenrolledStudents 
    })
}

const mapDispatchToProps = { fetchSchool, createSchool, updateSchool, destroySchool, updateStudent, destroyStudent };

export default connect(mapStateToProps, mapDispatchToProps)(SchoolsCreateUpdate);

