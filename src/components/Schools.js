import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Schools = ({ schools, history, students }) => {
    return(
        <Fragment>
            <h2>Schools</h2>
            <ul>
            {
                schools.map(school => <li key={ school.id }>
                    <Link to={`/schools/${school.id}`}>{ school.name }</Link> ({
                    students.filter(_student => (
                        _student.schoolId === school.id
                    )).length
                })
                </li>)
            }
            </ul>
            <button onClick={ () => history.push('/schools/create') }>Add new school</button>
            <br/>
            <button onClick={ () => history.goBack() }>Back</button>
        </Fragment>
    )
}

const mapStateToProps = ({ schools, students }, { history }) => ({ schools, history, students });

export default connect(mapStateToProps)(Schools);