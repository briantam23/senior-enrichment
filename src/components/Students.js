import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { destroyStudent } from '../store/actions/students';

const Students = ({ students, schools, history, destroyStudent }) => {
    return(
        <Fragment>
            <h2>Students</h2>
            <ul>
            {
                students.map(student => (
                    <li key={ student.id }>
                        <Link to={`/students/${student.id}`}>{ student.lastName + ', ' + student.firstName }</Link>
                    {
                        student.schoolId && schools
                        ? ' School: ' + schools.find(school => school.id === student.schoolId).name
                        : null
                    }
                        <button onClick={ () => destroyStudent(student) }>Delete</button>
                    </li>))
            }
            </ul>
            <button onClick={ () => history.push('/students/create') }>Add new student</button>
            <br/>
            <button onClick={ () => history.goBack() }>Back</button>
        </Fragment>
    )
}

const mapStateToProps = ({ students, schools }, { history }) => ({ students, schools, history });

const mapDispatchToProps = ({ destroyStudent });

export default connect(mapStateToProps, mapDispatchToProps)(Students);