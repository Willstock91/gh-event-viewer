import React from 'react';
import styles from './Home.module.css';
import { Container, Row, Col, Jumbotron } from 'react-bootstrap';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: 'Event Feed',
      selected: 'public'
    };
  }

  eventTypeChange = changeEvent => {
    this.setState({selected: changeEvent.target.value});
  }


  render() {
    return (
      <Jumbotron fluid>
        <Container fluid>
        <Row>
        <Col><h1>{this.state.title}</h1></Col>
        </Row>
        <Row>
          <Col md={10}></Col>
          <Col md={2}>
            <div className={styles.res}>
              <label className={styles.spacing}><input type="radio" name="selected" value="public" checked={this.state.selected === 'public'} onChange={this.eventTypeChange}/> Public</label>
              <label className={styles.spacing}><input type="radio" name="selected" value="byUser" checked={this.state.selected === 'byUser'} onChange={this.eventTypeChange}/> By User</label>
            </div>
          </Col>
        </Row>
        {this.state.selected && 
          <Row><Col>{this.state.selected}</Col></Row>
        }
      </Container>
    </Jumbotron>
    );
  }
}

export default Home;
