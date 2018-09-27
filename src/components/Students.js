import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Students = ({ students, schools }) => {
    return(
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
    )
}

const mapStateToProps = ({ students, schools }) => ({ students, schools });

export default connect(mapStateToProps)(Students);