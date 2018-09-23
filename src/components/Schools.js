import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Schools = ({ schools, history }) => {
    const handleClick = e => {
        e.preventDefault();
        history.push('/schools/create');
    }
    return(
        <Fragment>
            <ul>
            {
                schools.map(school => <li key={ school.id }>
                    <Link to={`/schools/${school.id}`}>{ school.name }</Link>
                </li>)
            }
            </ul>
            <button onClick={ (e) => handleClick(e) }>Add new school</button>
        </Fragment>
    )
}

const mapStateToProps = ({ schools }, { history }) => ({ schools, history });

export default connect(mapStateToProps)(Schools);