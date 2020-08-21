import React from 'react';
import styles from './Home.module.css';
import { Container, Row, Col, Jumbotron } from 'react-bootstrap';
import MaterialTable from 'material-table';
import ActorRow from '../stateless/ActorRow';
import RepoLink from '../stateless/RepoLink';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.gh = props.service;
    this.state = {
      title: 'Event Feed',
      selected: 'public',
      tableCols: [
        {title: "Repository", field: "repo.name", render: rowData => <RepoLink name={rowData.repo.name} onClick={() => this.click(rowData.repo.name)}></RepoLink>}, 
        {title: "Event Type", field: "type"},
        {title: "Username", field: "actor.login", render: rowData => <ActorRow actor={rowData.actor}></ActorRow>}
      ],
      tableData: [],
      detail: null
    };
    
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
        <Row>
          <Col>
            <MaterialTable title="Events" columns={this.state.tableCols} data={this.state.tableData}
              actions={[
                {
                  tooltip: 'Show Event Details',
                  icon: 'chevron_right',
                  position: 'row',
                  onClick: (evt, data) => this.setDetail(data)
                }
              ]}
            ></MaterialTable>
          </Col>
        </Row>
            <Row><Col>{this.state.detail && <span>{this.state.detail.id}</span>}</Col></Row>
      </Container>
    </Jumbotron>
    );
  }

  eventTypeChange = changeEvent => {
    let selected = changeEvent.target.value;
    this.gh.getEventData(selected).then(data =>  {
      this.setState({selected: selected, tableData: data})
    });
  }

  setDetail = data => {
    console.log(data);
    this.setState({detail: data});
  }

  click = repo => {
    window.open(`https://github.com/${repo}`);
  };

  componentDidMount(){
    this.gh.getEventData(this.state.selected).then(data =>this.setState({tableData: data}));
  }
}

export default Home;
