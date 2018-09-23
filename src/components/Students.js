import React from 'react';
import { connect } from 'react-redux';

const Students = ({ students }) => {
    return(
        <ul>
        {
            students.map(student => <li key={ student.id }>
                { student.lastName + ', ' + student.firstName }
            </li>)
        }
        </ul>
    )
}

const mapStateToProps = ({ students }) => ({ students });

export default connect(mapStateToProps)(Students);