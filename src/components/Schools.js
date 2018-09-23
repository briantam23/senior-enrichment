import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Schools = ({ schools }) => {
    return(
        <ul>
        {
            schools.map(school => <li key={ school.id }>
                <Link to={`/schools/${school.id}`}>{ school.name }</Link>
            </li>)
        }
        </ul>
    )
}

const mapStateToProps = ({ schools }) => ({ schools });

export default connect(mapStateToProps)(Schools);