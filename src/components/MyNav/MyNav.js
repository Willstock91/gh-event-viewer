import React from 'react';
import ActorRow from '../stateless/ActorRow';
import { Navbar, Button, Nav, NavDropdown, Container } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import styles from './MyNav.module.css';
import Home from '../Home/Home';
import Auth from '../Auth/Auth';

class MyNav extends React.Component {

    constructor(props) {
      super(props);
      this.gh = props.service; 
      this.state = {
          user: null
      };
    }
  
    render() {
        return (
            <Container className={styles.full} fluid>
                <Navbar sticky="top" bg="dark" variant="dark">
                    <Navbar.Brand href="#home">GitHub Event Feed</Navbar.Brand>
                    <Nav className={ "justify-content-end " + styles.full}>
                        {!this.state.user && <Button variant="primary" onClick={this.login}>Login</Button>}
                        {this.state.user && 
                            <NavDropdown title={<ActorRow actor={this.state.user}></ActorRow>} id="nav-dropdown">
                                <NavDropdown.Item onClick={this.logout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        }
                    </Nav>
                </Navbar>
                <Route exact path="/" render={() => <Home service={this.gh} user={this.state.user}/>}></Route> 
                <Route exact path="/auth" render={() => <Auth service={this.gh}/>}></Route>
            </Container>
            
        )
    }

    componentDidMount() {
        this.gh.logon.on('success', this.updateState);
    }

    login = () => {
        window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&scope=repo%20user`;
    }

    logout = () => {
        sessionStorage.clear();
        this.setState({user: null});
    }

    updateState = () => {
        let user = JSON.parse(sessionStorage.getItem('user'));
        this.setState({user: user});
    }
}

export default MyNav;