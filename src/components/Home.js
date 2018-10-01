import React, { Fragment } from 'react';

const Home = ({ history }) => (
    <Fragment>
        <h2>Home Page</h2>
        <hr/><br/>
        <img src='../../public/michiganLogo.jpg' alt='Michigan Logo' />
        <br/><br/><hr/>
        <button onClick={ () => history.goBack() }>Back</button>
        &emsp;
        <button onClick={ () => history.goForward() }>Forward</button>
    </Fragment>
)

export default Home;