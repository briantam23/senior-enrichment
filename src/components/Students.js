import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { destroyStudent } from '../store/actions/students';
import { Button } from 'reactstrap';


const Students = ({ students, schools, history, destroyStudent }) => (
    <Fragment>
        <h2>Students</h2>
        <hr/>
        <ul>
        {
            students.map(student => (
                <li key={ student.id }>
                    <Link to={ `/students/${student.id}` }>{ student.lastName + ', ' + student.firstName }</Link>
                    <Button onClick={ () => destroyStudent(student) } color='danger' style={{ float: 'right' }}>Delete</Button>
                    <br/>
                {
                    student.schoolId && schools
                    ? ' School: ' + schools.find(school => school.id === student.schoolId).name
                    : null
                }
                    <br/>
                </li>))
        }
        </ul>
        <Button onClick={ () => history.push('/students/create') } color='success'>Add new student</Button>
    </Fragment>
)

const mapStateToProps = ({ students, schools }, { history }) => ({ students, schools, history });

const mapDispatchToProps = ({ destroyStudent });

export default connect(mapStateToProps, mapDispatchToProps)(Students);