import React from 'react';
import { connect } from 'react-redux';

const Schools = ({ schools }) => {
    return(
        <ul>
        {
            schools.map(school => <li key={ school.id }>
                { school.name }
            </li>)
        }
        </ul>
    )
}

const mapStateToProps = ({ schools }) => ({ schools });

export default connect(mapStateToProps)(Schools);