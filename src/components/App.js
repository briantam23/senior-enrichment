import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, HashRouter as Router } from 'react-router-dom';
import { loadInitialSchools, loadInitialStudents } from '../store/actions';
import Nav from './Nav';
import Schools from './Schools';
import Students from './Students';
import SchoolsCreateUpdate from './SchoolsCreateUpdate';

class App extends Component {
    componentDidMount() {
        const { loadInitialSchools, loadInitialStudents } = this.props;
        loadInitialSchools();
        loadInitialStudents();
    }
    render() {
        const { students } = this.props;
        if(!students[0]) return <h1>Loading...</h1>
        return(
            <Fragment>
                <h1>Acme School</h1>
                <Router>
                    <Fragment>
                        <Nav />
                        <Route exact path='/schools' render={ () => <Schools /> } />
                        <Route path='/students' render={ () => <Students /> } />
                        <Route path='/schools/:id' render={ ({ match }) => <SchoolsCreateUpdate id={ match.params.id } /> } />
                    </Fragment>
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = ({ students })=> ({
    students
})

const mapDispatchToProps = { loadInitialSchools, loadInitialStudents };

export default connect(mapStateToProps, mapDispatchToProps)(App);