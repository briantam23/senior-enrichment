import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, HashRouter as Router, Switch } from 'react-router-dom';
import { loadInitialSchools } from '../store/actions/schools';
import { loadInitialStudents } from '../store/actions/students';
import Nav from './Nav';
import Schools from './Schools';
import Students from './Students';
import SchoolsCreateUpdate from './SchoolsCreateUpdate';
import StudentsCreateUpdate from './StudentsCreateUpdate';
import Home from './Home';
import Footer from './Footer';
import ReactLoading from 'react-loading';


class App extends Component {
    constructor() {
        super();
        this.state = { loading: true };
    }
    componentDidMount() {
        const { loadInitialSchools, loadInitialStudents } = this.props;
        loadInitialSchools()
            .then(() => loadInitialStudents())
            .then(() =>this.setState({ loading: false }))
    }
    render() {
        if(this.state.loading) return <ReactLoading type='spokes' color='black' />
        return(
            <div id='box'>
                <img src='../../public/school.jpeg' alt='Picture of School' />
                <h1>Acme School</h1>
                <Router>
                    <Fragment>
                        <Route render={ ({ location }) => <Nav pathname={ location.pathname } /> } />
                        <Switch>
                            <Route exact path='/' render={ () => <Home /> } />
                            <Route exact path='/schools' render={ ({ history }) => <Schools history={ history } /> } />
                            <Route exact path='/students' render={ ({ history }) => <Students history={ history } /> } />
                            
                            <Route path={ '/schools/:id' || '/schools/create' } render={ ({ match, history }) => 
                                <SchoolsCreateUpdate id={ match.params.id } history={ history } /> } />
                        
                            <Route path={ '/students/create/:schoolId' } render={ ({ match, history }) => 
                                <StudentsCreateUpdate schoolId={ match.params.schoolId } history={ history } /> } />
                            
                            <Route path={ '/students/:studentId' ||  '/students/create' } render={ ({ match, history }) => 
                                <StudentsCreateUpdate studentId={ match.params.studentId } history={ history } /> } />
                        </Switch>
                        <Route render={ ({ history }) => <Footer history={ history } /> } />
                    </Fragment>
                </Router>
            </div>
        )
    }
}

const mapDispatchToProps = { loadInitialSchools, loadInitialStudents };

export default connect(null, mapDispatchToProps)(App);