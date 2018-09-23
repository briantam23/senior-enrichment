import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { loadInitialSchools, loadInitialStudents } from '../store/actions';
import Nav from './Nav';

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
                <Nav />
            </Fragment>
        )
    }
}

const mapStateToProps = ({ students })=> ({
    students
})

const mapDispatchToProps = { loadInitialSchools, loadInitialStudents };

export default connect(mapStateToProps, mapDispatchToProps)(App);