import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Students = ({ students }) => {
    return(
        <ul>
        {
            students.map(student => <li key={ student.id }>
                <Link to={`/students/${student.id}`}>{ student.lastName + ', ' + student.firstName }</Link>
            </li>)
        }
        </ul>
    )
}

const mapStateToProps = ({ students }) => ({ students });

export default connect(mapStateToProps)(Students);