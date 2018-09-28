import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


const Nav = ({ schools, students }) => {
    return(
        <ul>
            <li><Link to='/schools'>Schools</Link> ({ schools.length })</li>
            <li><Link to='/students'>Students</Link> ({ students.length })</li>
        </ul>
    )
}

const mapStateToProps = ({ schools, students }) => ({ schools, students });

export default connect(mapStateToProps)(Nav);