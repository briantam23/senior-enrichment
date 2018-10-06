import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { selected } from '../utils';
import { Badge } from 'reactstrap';


const Nav = ({ schools, students, pathname }) => (
    <Fragment>
        <ul className='nav'>
            <li style={ selected('/', pathname) }>
                <Link to='/'>Home</Link>
            </li>
            <li style={ selected('/schools', pathname, true) }>
                <Link to='/schools'>Schools</Link> 
                &nbsp;
                <Badge color='light'>{ schools.length }</Badge>
            </li>
            <li style={ selected('/students', pathname, true) }>
                <Link to='/students'>Students</Link> 
                &nbsp;
                <Badge color='light'>{ students.length }</Badge>
            </li>
        </ul>
        <br/>
    </Fragment>
)

const mapStateToProps = ({ schools, students }, { pathname }) => ({ schools, students, pathname });

export default connect(mapStateToProps)(Nav);
