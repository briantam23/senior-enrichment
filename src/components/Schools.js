import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { destroySchool } from '../store/actions/schools';
import { Button, Table } from 'reactstrap';


export const Schools = ({ schools, history, students, destroySchool }) => (
    <Fragment>
        <h2>Schools</h2>
        <hr/>
        <Table dark striped>
            <thead>
                <tr>
                    <th>School Name</th>
                    <th>Number of Students</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
            {
            schools.map(school => (
                <tr key={ school.id }>
                    <td>
                        <Link to={`/schools/${school.id}`}>{ school.name }</Link> 
                    </td>
                    <td>
                        { students.filter(_student => _student.schoolId === school.id).length}
                    </td>
                    <td>
                        <Button onClick={ () => destroySchool(school, null, students) } color='danger' style={{ float: 'right' }}>Delete</Button>
                    </td>
                </tr>))
            }
            </tbody>
        </Table>
        <Button onClick={ () => history.push('/schools/create') } color='success' block>Add new school</Button>
    </Fragment>
)

const mapStateToProps = ({ schools, students }, { history }) => ({ schools, history, students });

const mapDispatchToProps = ({ destroySchool });

export default connect(mapStateToProps, mapDispatchToProps)(Schools);