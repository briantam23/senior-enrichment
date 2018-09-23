import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { destroySchool } from '../store/actions';

class SchoolsCreateUpdate extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            description: '',
            address: ''
        }
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        //this.onSubmit
    }
    handleNameChange(e) {
        this.setState({ name: e.target.value });
    }
    handleDescriptionChange(e) {
        this.setState({ description: e.target.value });
    }
    handleAddressChange(e) {
        this.setState({ address: e.target.value });
    }
    onSubmit(e) {
        e.preventDefault();
    }
    onCreate(e) {
        e.preventDefault();
    }
    render() {
        const { school, id, destroySchool, history } = this.props;
        const { handleNameChange, handleDescriptionChange, handleAddressChange, onSubmit, onCreate } = this;
        const { name, description, address } = this.state;
        return(
            <Fragment>
                <h2>Schools</h2>
                <h5>{ school.name }</h5>
                <form onSubmit={ onSubmit }>
                    <label htmlFor='name'>Name: </label>
                        <input onChange={ handleNameChange } value={ name } id='name'></input>
                    <br/>
                    <label htmlFor='description'>Description: </label>
                        <input onChange={ handleDescriptionChange } value={ description } id='description'></input>
                    <br/>
                    <label htmlFor='address'>Address: </label>
                        <input onChange={ handleAddressChange } value={ address }></input>
                    <br/>
                    <button disabled={ !name || !description || !address }>Save</button>
                </form>
                <button onClick={ () => destroySchool(school, history) }>Delete</button>
                <button onClick={ () => onCreate() }>Add new student</button>
            </Fragment>
        )
    }
}

const mapStateToProps = ({ schools }, { id, history }) => ({ 
    school: schools[id - 1],
    id,
    history 
});

const mapDispatchToProps = { destroySchool };

export default connect(mapStateToProps, mapDispatchToProps)(SchoolsCreateUpdate);

