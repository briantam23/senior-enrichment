import React, { Fragment } from 'react';

const Footer = ({ history }) => {
    return(
        <Fragment>
            <br/><br/><hr/>
            <button onClick={ () => history.goBack() }>Back</button>
            &emsp;
            <button onClick={ () => history.goForward() }>Forward</button>
        </Fragment>
    )
}

export default Footer;