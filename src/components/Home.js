import React, { Fragment } from 'react';

const Home = ({ history }) => (
    <Fragment>
        <h1>Home Page</h1>
        <button onClick={ () => history.goBack() }>Back</button>
    </Fragment>
)

export default Home;