import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { destroyStudent } from '../store/actions/students';
import { Button, Table } from 'reactstrap';


const Students = ({ students, schools, history, destroyStudent }) => (
    <Fragment>
        <h2>Students</h2>
        <hr/>
        <Table striped dark>
            <thead>
                <tr>
                    <th>Student Name</th>
                    <th>School Name</th>
                    <th>GPA</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
            {
                students.map(student => (
                    <tr key={ student.id }>
                        <td>
                            <Link to={ `/students/${student.id}` }>{ student.lastName + ', ' + student.firstName }</Link>
                        </td>
                        <td>
                        {
                            student.schoolId && schools
                                ? schools.find(school => school.id === student.schoolId).name
                                : null
                        }
                        </td> 
                        <td>
                            { student.GPA }
                        </td>   
                        <td>
                            <Button onClick={ () => destroyStudent(student) } color='danger' style={{ float: 'right' }}>Delete</Button>
                        </td>
                    </tr>))
            }
            </tbody>
        </Table>
        <Button onClick={ () => history.push('/students/create') } color='success' block>Add new student</Button>
    </Fragment>
)

const mapStateToProps = ({ students, schools }, { history }) => ({ students, schools, history });

const mapDispatchToProps = ({ destroyStudent });

export default connect(mapStateToProps, mapDispatchToProps)(Students);