import React, { Fragment } from 'react';

const Home = ({ history }) => (
    <Fragment>
        <h2>Home Page</h2>
        <img src='../../public/michiganStadium.jpeg' alt='Michigan Stadium' />
        <br/>
        <button onClick={ () => history.goBack() }>Back</button>
    </Fragment>
)

export default Home;