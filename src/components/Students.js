import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Students = ({ students, schools, history }) => {
    return(
        <Fragment>
            <ul>
            {
                students.map(student => (
                    <li key={ student.id }>
                        <Link to={`/students/${student.id}`}>{ student.lastName + ', ' + student.firstName }</Link>
                    {
                        student.schoolId 
                        ? ' School: ' + schools.find(school => school.id === student.schoolId).name
                        : null
                    }
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

export default connect(mapStateToProps)(Students);