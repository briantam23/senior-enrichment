import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadInitialSchools } from '../store/actions';

class App extends Component {
    componentDidMount() {
        this.props.loadInitialSchools();
    }
    render() {
        //const { fetchSchools } = this.props;
        return(
            <h1>Acme School</h1>
        )
    }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
    loadInitialSchools: () => dispatch(loadInitialSchools())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);