import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { selected } from '../utils';


const Nav = ({ schools, students, pathname }) => {
    return(
        <ul>
            <li style={ selected('/', pathname) }><Link to='/'>Home</Link></li>
            <li style={ selected('/schools', pathname, true) }><Link to='/schools'>Schools</Link> ({ schools.length })</li>
            <li style={ selected('/students', pathname, true) }><Link to='/students'>Students</Link> ({ students.length })</li>
        </ul>
    )
}

const mapStateToProps = ({ schools, students }, { pathname }) => ({ schools, students, pathname });

export default connect(mapStateToProps)(Nav);
