import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, Route, HashRouter as Router } from 'react-router-dom';
import Schools from './Schools';
import Students from './Students';

const Nav = ({ schools, students }) => {
    return(
        <Router>
            <Fragment>
                <ul>
                    <li><Link to='/schools'>Schools ({ schools.length })</Link></li>
                    <li><Link to='/students'>Students ({ students.length })</Link></li>
                </ul>
                <Route path='/schools' render={ () => <Schools /> } />
                <Route path='/students' render={ () => <Students /> } />
            </Fragment>
        </Router>
    )
}

const mapStateToProps = ({ schools, students }) => ({
    schools,
    students
})

export default connect(mapStateToProps)(Nav);