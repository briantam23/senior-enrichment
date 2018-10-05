import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { destroySchool } from '../store/actions/schools';
import { Button } from 'reactstrap';


export const Schools = ({ schools, history, students, destroySchool }) => (
    <Fragment>
        <h2>Schools</h2>
        <hr/>
        <ul>
        {
            schools.map(school => (
                <li key={ school.id }>
                    <Link to={`/schools/${school.id}`} className='alert-link'>{ school.name }</Link> 
                ({
                    students.filter(_student => _student.schoolId === school.id).length
                }) 
                    <Button onClick={ () => destroySchool(school, null, students) } color='danger' style={{ float: 'right' }}>Delete</Button>
                    <br/><br/>
                </li>))
        }
        </ul>
        <Button onClick={ () => history.push('/schools/create') } color='success' block>Add new school</Button>
    </Fragment>
)

const mapStateToProps = ({ schools, students }, { history }) => ({ schools, history, students });

const mapDispatchToProps = ({ destroySchool });

export default connect(mapStateToProps, mapDispatchToProps)(Schools);