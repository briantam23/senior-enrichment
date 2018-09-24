import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, HashRouter as Router } from 'react-router-dom';
import { loadInitialSchools } from '../store/actions/schools';
import { loadInitialStudents } from '../store/actions/students';
import Nav from './Nav';
import Schools from './Schools';
import Students from './Students';
import SchoolsCreateUpdate from './SchoolsCreateUpdate';
import StudentsCreateUpdate from './StudentsCreateUpdate';

class App extends Component {
    componentDidMount() {
        const { loadInitialSchools, loadInitialStudents } = this.props;
        loadInitialSchools();
        loadInitialStudents();
    }
    render() {
        const { students } = this.props;
        if(!students[0]) return <h1>Loading...</h1> //what if there are no students
        return(
            <Fragment>
                <h1>Acme School</h1>
                <Router>
                    <Fragment>
                        <Nav />
                        <Route exact path='/schools' render={ ({ history }) => <Schools history={ history } /> } />
                        <Route exact path='/students' render={ () => <Students /> } />
                        <Route path={ '/schools/:id' || '/schools/create' } render={ ({ match, history }) => <SchoolsCreateUpdate id={ match.params.id } history={ history } /> } />
                        <Route path={ '/students/:id' || '/students/create' } render={ ({ match, history }) => <StudentsCreateUpdate id={ match.params.id } history={ history } /> } />
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