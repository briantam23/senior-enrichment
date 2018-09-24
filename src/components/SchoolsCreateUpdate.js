import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchSchool, createSchool, updateSchool, destroySchool } from '../store/actions/schools';

class SchoolsCreateUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            address: ''
        }
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCreate = this.onCreate.bind(this);

        const { id, fetchSchool } = this.props;
        if(id !== 'create') fetchSchool(id);
    }
    componentDidUpdate(prevProps) {
        const { school, id } = this.props;
        if(prevProps !== this.props) {
            id !== 'create' 
            ? this.setState(school)
            : this.setState({ name: '', description: '', address: '' })
        }
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
        const { id, history, createSchool, updateSchool } = this.props;
        console.log(id)
        id !== 'create' 
        ? updateSchool({ ...this.state, id }, history)
        : createSchool(this.state, history)
    }
    onCreate(e) {
        e.preventDefault();
        this.props.history.push('/students/create');
    }
    render() {
        const { school, id, destroySchool, history } = this.props;
        const { handleNameChange, handleDescriptionChange, handleAddressChange, onSubmit, onCreate } = this;
        const { name, description, address } = this.state;
        return(
            <Fragment>
                <h2>School</h2>
                {
                    id !== 'create' ? <h5>{ school.name }</h5> : null
                }
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
                {
                    id !== 'create' ? (
                    <Fragment>
                        <br/>
                        <button onClick={ () => destroySchool(school, history) }>Delete</button>
                        <button onClick={ (e) => onCreate(e) }>Add new student</button> 
                    </Fragment>
                    ): null 
                }
            </Fragment>
        )
    }
}

const mapStateToProps = ({ school }, { id, history }) => ({ school, id, history });

const mapDispatchToProps = { fetchSchool, createSchool, updateSchool, destroySchool };

export default connect(mapStateToProps, mapDispatchToProps)(SchoolsCreateUpdate);

