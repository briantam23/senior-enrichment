import React, { Fragment } from 'react';
import { Button } from 'reactstrap';


const Footer = ({ history }) => (
    <Fragment>
        <br/><hr/>
        <Button onClick={ () => history.goBack() } color='info'>Back</Button>
        <Button onClick={ () => history.goForward() } color= 'info' style={{ float: 'right' }}>Forward</Button>
    </Fragment>
)

export default Footer;