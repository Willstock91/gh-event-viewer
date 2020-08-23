import React from 'react';
import { Redirect } from 'react-router-dom';
import { Container } from 'react-bootstrap';

class Auth extends React.Component {

    constructor(props) {
        super(props);
        this.gh = props.service;
        this.state = {redirect: false};
    }

    render() {
        if(this.state.redirect) {
            return <Redirect to="/"/>
        } else {
            return  <Container/>
        }
    }


    componentDidMount() {
        let code = new URLSearchParams(window.location.search).get('code');
        this.gh.authorizeUser(code).then(() => this.setState({redirect: true}));
    }
}


export default Auth;