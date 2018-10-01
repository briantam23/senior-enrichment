import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { destroySchool } from '../store/actions/schools';

export const Schools = ({ schools, history, students, destroySchool }) => {
    return(
        <Fragment>
            <h2>Schools</h2>
            <hr/>
            <ul>
            {
                schools.map(school => (
                    <li key={ school.id }>
                        <Link to={`/schools/${school.id}`}>{ school.name }</Link> ({
                        students.filter(_student => (
                            _student.schoolId === school.id
                        )).length
                        }) 
                        &emsp;
                        <button onClick={ () => destroySchool(school, null, students) }>Delete</button>
                    </li>))
            }
            </ul>
            <button onClick={ () => history.push('/schools/create') }>Add new school</button>
            <br/><br/><hr/>
            <button onClick={ () => history.goBack() }>Back</button>
            &emsp;
            <button onClick={ () => history.goForward() }>Forward</button>
        </Fragment>
    )
}

const mapStateToProps = ({ schools, students }, { history }) => ({ schools, history, students });

const mapDispatchToProps = ({ destroySchool });

export default connect(mapStateToProps, mapDispatchToProps)(Schools);