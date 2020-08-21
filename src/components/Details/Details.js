import React from 'react';
import styles from './Details.module.css';
import { Container, Row, Col, Jumbotron } from 'react-bootstrap';
import RepoLink from '../stateless/RepoLink';
import ActorRow from '../stateless/ActorRow';

class Details extends React.Component {
    
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <Container fluid>
                <h1>Event Details</h1>
                <Row>
                    <img/><strong>Username</strong>
                </Row>
                <Row>
                    <label>Event ID: </label> ID
                </Row>
                <Row>
                    <label>Event Type: </label> Type
                </Row>
                <Row>
                    <label>Created At: </label> Created At
                </Row>
            </Container>
        );
    }

    componentDidMount() {

    }

}

export default Details;